import os

import pandas as pd
import torch
from PIL import Image
from torch.utils.data import Dataset


class IP102HierarchicalDataset(Dataset):
    def __init__(self, root_dir, taxonomy_map, transform=None, split="train"):
        self.root_dir = root_dir
        self.transform = transform
        self.taxonomy_map = taxonomy_map
        self.img_dir = os.path.join(root_dir, "images")

        splits = {"train": "train.txt", "val": "val.txt", "test": "test.txt"}
        if split not in splits:
            raise ValueError(f"Invalid split. Expected one of {list(splits.keys())}")

        labels_fname = os.path.join(root_dir, splits[split])

        labels_df = pd.read_csv(labels_fname, sep=" ", header=None, names=["filename", "label"])
        self.labels = labels_df["label"].values
        self.filenames = labels_df["filename"].values

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        img_path = os.path.join(self.img_dir, self.filenames[idx])

        try:
            image = Image.open(img_path).convert("RGB")
        except Exception as e:
            print(f"Corrupted image at {img_path}: {e}. Falling back to next index.")
            return self.__getitem__((idx + 1) % len(self))

        if self.transform:
            image = self.transform(image)
        else:
            raise ValueError("You must provide a transform.")

        species_id = int(self.labels[idx])

        order_id = self.taxonomy_map[str(species_id)]["order"]
        family_id = self.taxonomy_map[str(species_id)]["family"]

        targets = {
            "order": torch.tensor(order_id, dtype=torch.long),
            "family": torch.tensor(family_id, dtype=torch.long),
            "species": torch.tensor(species_id, dtype=torch.long),
        }

        return image, targets
