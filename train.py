if __name__ == "__main__":
    import json

    import torch
    import torch.nn as nn
    from torch.utils.data import DataLoader
    from torchvision.transforms import (
        ColorJitter,
        Compose,
        Normalize,
        RandomAdjustSharpness,
        RandomHorizontalFlip,
        RandomRotation,
        Resize,
        ToTensor,
    )

    from dataset import IP102HierarchicalDataset
    from helpers import train
    from model import HierarchicalPestClassifier

    num_epochs = 20
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    resize_size = 256
    batch_size = 32
    criterion = nn.CrossEntropyLoss()

    with open("taxonomy.json", "r") as f:
        raw_taxonomy = json.load(f)

    unique_orders = set([data["order"] for data in raw_taxonomy.values()])
    unique_families = set([data["family"] for data in raw_taxonomy.values()])

    order_to_id = {name: idx for idx, name in enumerate(sorted(unique_orders))}
    family_to_id = {
        name: idx for idx, name in enumerate(sorted(unique_families))
    }

    taxonomy = {}

    for species_id, data in raw_taxonomy.items():
        taxonomy[species_id] = {
            "order": order_to_id[data["order"]],
            "family": family_to_id[data["family"]],
        }

    train_transforms = Compose(
        [
            ColorJitter(brightness=0.1, hue=0.1, contrast=0.2, saturation=0.2),
            RandomHorizontalFlip(),
            RandomAdjustSharpness(2, p=0.3),
            RandomRotation(15),
            Resize((224, 224)),
            ToTensor(),
            Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )
    val_transforms = Compose(
        [
            Resize((224, 224)),
            ToTensor(),
            Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )

    train_dataset = IP102HierarchicalDataset(
        "ip102_v1.1", taxonomy, train_transforms, split="train"
    )
    val_dataset = IP102HierarchicalDataset(
        "ip102_v1.1", taxonomy, train_transforms, split="val"
    )

    train_loader = DataLoader(
        train_dataset, batch_size=batch_size, shuffle=True
    )
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)

    model = HierarchicalPestClassifier(
        num_orders=len(unique_orders), num_families=len(unique_families)
    ).to(device)
    optimizer = torch.optim.AdamW(
        [
            {"params": model.backbone.parameters(), "lr": 1e-5},
            {"params": model.order_head.parameters(), "lr": 1e-3},
            {"params": model.family_head.parameters(), "lr": 1e-3},
            {"params": model.species_head.parameters(), "lr": 1e-3},
        ],
        weight_decay=1e-4,
    )

    history = train(
        model,
        train_loader,
        val_loader,
        criterion,
        optimizer,
        device,
        num_epochs,
    )

    with open("training_history.json", "w") as f:
        json.dump(history, f)
