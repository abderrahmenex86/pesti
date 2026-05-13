if __name__ == "__main__":
    import json
    import random

    import numpy as np
    import torch
    import torch.nn as nn
    from torch.utils.data import DataLoader
    from torchvision.transforms import (
        CenterCrop,
        ColorJitter,
        Compose,
        Normalize,
        RandomHorizontalFlip,
        RandomResizedCrop,
        Resize,
        ToTensor,
    )

    from dataset import IP102Dataset
    from helpers import train
    from model import PestClassifier

    random.seed(1337)
    np.random.seed(1337)
    torch.manual_seed(1337)
    torch.cuda.manual_seed_all(1337)
    torch.backends.cudnn.benchmark = True

    n_epochs = 25
    batch_size = 256

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    criterion = nn.CrossEntropyLoss(label_smoothing=0.1)

    train_transforms = Compose(
        [
            RandomResizedCrop(224, scale=(0.6, 1.0)),
            RandomHorizontalFlip(),
            ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2, hue=0.05),
            ToTensor(),
            Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )

    train_dataset = IP102Dataset("ip102_v1.1", transform=train_transforms, split="train")

    train_loader = DataLoader(
        train_dataset,
        batch_size=batch_size,
        shuffle=True,
        num_workers=4,
        pin_memory=True,
    )

    val_transforms = Compose(
        [
            Resize(256),
            CenterCrop(224),
            ToTensor(),
            Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )

    val_dataset = IP102Dataset("ip102_v1.1", transform=val_transforms, split="val")

    val_loader = DataLoader(
        val_dataset,
        batch_size=batch_size,
        shuffle=False,
        num_workers=4,
        pin_memory=True,
    )

    model = PestClassifier().to(device)

    optimizer = torch.optim.AdamW(
        model.parameters(),
        lr=1e-3,
        weight_decay=1e-2,
    )

    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=n_epochs)

    history = train(model, train_loader, val_loader, criterion, optimizer, scheduler, device, n_epochs)

    with open("training_history.json", "w") as f:
        json.dump(history, f)
