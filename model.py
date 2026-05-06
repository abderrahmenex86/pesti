import torch.nn as nn
import torchvision.models as models


class HierarchicalPestClassifier(nn.Module):
    def __init__(self, num_orders, num_families, num_species=102):
        super().__init__()

        base_model = models.mobilenet_v3_small(
            weights=models.MobileNet_V3_Small_Weights.DEFAULT
        )
        self.backbone = base_model.features
        self.pool = nn.AdaptiveAvgPool2d((1, 1))
        self.flatten = nn.Flatten()
        self.dropout = nn.Dropout(p=0.2)

        self.order_head = nn.Linear(576, num_orders)
        self.family_head = nn.Linear(576, num_families)
        self.species_head = nn.Linear(576, num_species)

    def forward(self, x):
        features = self.backbone(x)
        features = self.dropout(features)
        features = self.pool(features)
        features = self.flatten(features)

        return {
            "order": self.order_head(features),
            "family": self.family_head(features),
            "species": self.species_head(features),
        }
