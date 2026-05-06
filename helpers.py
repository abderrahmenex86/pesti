import torch
from tqdm.auto import tqdm


def train(
    model, train_loader, val_loader, criterion, optimizer, device, num_epochs
):
    best_val_loss = float("inf")
    history = {
        "train": {
            "loss": [],
            "loss_order": [],
            "loss_family": [],
            "loss_species": [],
            "acc_order": [],
            "acc_family": [],
            "acc_species": [],
        },
        "val": {
            "loss": [],
            "loss_order": [],
            "loss_family": [],
            "loss_species": [],
            "acc_order": [],
            "acc_family": [],
            "acc_species": [],
        },
    }

    progress_bar = tqdm(range(1, num_epochs + 1), unit="epoch", leave=True)

    for _ in progress_bar:
        train_metrics = train_epoch(
            model, train_loader, criterion, optimizer, device
        )
        val_metrics = evaluate(model, val_loader, criterion, device)
        for k, v in train_metrics.items():
            history["train"][k].append(v)
        for k, v in val_metrics.items():
            history["val"][k].append(v)

        tqdm.write(f"Train Loss: {train_metrics['loss']:.4f}")
        tqdm.write(f"Val Loss:   {val_metrics['loss']:.4f}")
        tqdm.write(
            f"Val Acc -> Order: {val_metrics['acc_order']:.2f}% | Family: {val_metrics['acc_family']:.2f}% | Species: {val_metrics['acc_species']:.2f}%"
        )

        if val_metrics["loss"] < best_val_loss:
            best_val_loss = val_metrics["loss"]
            torch.save(model.state_dict(), "best_pest_model.pth")
            tqdm.write("Model is saved.")
    return history


def train_epoch(model, loader, criterion, optimizer, device):
    model.train()
    metrics = {
        k: 0.0
        for k in [
            "loss",
            "loss_order",
            "loss_family",
            "loss_species",
            "acc_order",
            "acc_family",
            "acc_species",
        ]
    }
    total_samples = 0

    progress_bar = tqdm(loader, desc="Training", leave=False, unit="batch")

    for data, targets in progress_bar:
        data = data.to(device)
        targets = {k: v.to(device) for k, v in targets.items()}

        optimizer.zero_grad()
        predictions = model(data)

        loss_order = criterion(predictions["order"], targets["order"])
        loss_family = criterion(predictions["family"], targets["family"])
        loss_species = criterion(predictions["species"], targets["species"])
        total_loss = 0.1 * loss_order + 0.3 * loss_family + loss_species

        total_loss.backward()
        optimizer.step()

        bs = data.size(0)
        total_samples += bs
        metrics["loss"] += total_loss.item() * bs
        metrics["loss_order"] += loss_order.item() * bs
        metrics["loss_family"] += loss_family.item() * bs
        metrics["loss_species"] += loss_species.item() * bs

        metrics["acc_order"] += (
            (torch.argmax(predictions["order"], dim=1) == targets["order"])
            .sum()
            .item()
        )
        metrics["acc_family"] += (
            (torch.argmax(predictions["family"], dim=1) == targets["family"])
            .sum()
            .item()
        )
        metrics["acc_species"] += (
            (torch.argmax(predictions["species"], dim=1) == targets["species"])
            .sum()
            .item()
        )

        progress_bar.set_postfix({"loss": f"{total_loss.item():.3f}"})

    # return running_loss / len(loader)
    return {
        k: (v / total_samples if "acc" not in k else (v / total_samples) * 100)
        for k, v in metrics.items()
    }


def evaluate(model, loader, criterion, device):
    model.eval()
    metrics = {
        k: 0.0
        for k in [
            "loss",
            "loss_order",
            "loss_family",
            "loss_species",
            "acc_order",
            "acc_family",
            "acc_species",
        ]
    }
    total_samples = 0

    progress_bar = tqdm(loader, desc="Evaluating", leave=False, unit="batch")

    with torch.no_grad():
        for data, targets in progress_bar:
            data = data.to(device)
            targets = {k: v.to(device) for k, v in targets.items()}
            predictions = model(data)

            loss_order = criterion(predictions["order"], targets["order"])
            loss_family = criterion(predictions["family"], targets["family"])
            loss_species = criterion(predictions["species"], targets["species"])
            total_loss = 0.1 * loss_order + 0.3 * loss_family + loss_species

            bs = data.size(0)
            total_samples += bs
            metrics["loss"] += total_loss.item() * bs
            metrics["loss_order"] += loss_order.item() * bs
            metrics["loss_family"] += loss_family.item() * bs
            metrics["loss_species"] += loss_species.item() * bs
            metrics["acc_order"] += (
                (torch.argmax(predictions["order"], dim=1) == targets["order"])
                .sum()
                .item()
            )
            metrics["acc_family"] += (
                (
                    torch.argmax(predictions["family"], dim=1)
                    == targets["family"]
                )
                .sum()
                .item()
            )
            metrics["acc_species"] += (
                (
                    torch.argmax(predictions["species"], dim=1)
                    == targets["species"]
                )
                .sum()
                .item()
            )

            progress_bar.set_postfix({"val_loss": f"{total_loss.item():.3f}"})

    return {
        k: (v / total_samples if "acc" not in k else (v / total_samples) * 100)
        for k, v in metrics.items()
    }
