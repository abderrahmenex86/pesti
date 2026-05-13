import torch.nn as nn
from torchvision.models import MobileNet_V3_Large_Weights, mobilenet_v3_large


class PestClassifier(nn.Module):
    def __init__(self, num_species=102):
        super().__init__()

        self.model = mobilenet_v3_large(weights=MobileNet_V3_Large_Weights.DEFAULT)

        in_features = self.model.classifier[3].in_features

        self.model.classifier[3] = nn.Linear(in_features, num_species)

    def forward(self, x):
        x = self.model(x)
        return x
