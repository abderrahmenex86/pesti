import os

import pandas as pd
import torch
from PIL import Image
from torch.utils.data import Dataset


class IP102Dataset(Dataset):
    def __init__(self, root_dir, transform=None, split="train"):
        assert split in [
            "train",
            "val",
            "test",
        ], "Invalid split. Expected one of ['train', 'val', 'test']"
        self.root_dir = root_dir
        self.transform = transform
        self.img_dir = os.path.join(root_dir, "images")

        splits = {"train": "train.txt", "val": "val.txt", "test": "test.txt"}

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

        target = torch.tensor(int(self.labels[idx]), dtype=torch.long)

        return image, target
