import json

import torch
from PIL import Image
from torchvision.transforms import Compose, Normalize, Resize, ToTensor

from model import HierarchicalPestClassifier


class PestDetector:
    def __init__(self, model_path, taxonomy_path, device, transform):

        self.device = device
        self.transforms = transform

        with open(taxonomy_path, "r") as f:
            self.taxonomy = json.load(f)

        unique_orders = len(set([data["order"] for data in self.taxonomy.values()]))
        unique_families = len(set([data["family"] for data in self.taxonomy.values()]))

        self.model = HierarchicalPestClassifier(num_orders=unique_orders, num_families=unique_families)
        self.model.load_state_dict(torch.load(model_path, map_location=self.device))
        self.model.to(self.device)
        self.model.eval()

    def predict(self, image_path):
        image = Image.open(image_path).convert("RGB")
        input_tensor = self.transforms(image).unsqueeze(0).to(self.device)

        with torch.no_grad():
            preds = self.model(input_tensor)

            order_probs = torch.softmax(preds["order"], dim=1)[0]
            family_probs = torch.softmax(preds["family"], dim=1)[0]
            species_probs = torch.softmax(preds["species"], dim=1)[0]

            best_score = -1
            best_path = {}

            for species_id_str, tax in self.taxonomy.items():
                species_idx = int(species_id_str)
                family_idx = tax["family"]
                order_idx = tax["order"]

                joint_prob = (order_probs[order_idx] * family_probs[family_idx] * species_probs[species_idx]).item()

                if joint_prob > best_score:
                    best_score = joint_prob
                    best_path = {
                        "order_id": order_idx,
                        "family_id": family_idx,
                        "species_id": species_idx,
                        "confidence": joint_prob * 100,
                    }

        return best_path


if __name__ == "__main__":
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    transform = Compose(
        [
            Resize((224, 224)),
            ToTensor(),
            Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )
    detector = PestDetector(
        "best_pest_model.pth",
        "taxonomy.json",
        device=device,
        transform=transform,
    )
