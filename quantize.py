import json
import os

import torch
import torch.ao.quantization

from model import HierarchicalPestClassifier


def quantize_model():
    with open("taxonomy.json", "r") as f:
        taxonomy = json.load(f)

    unique_orders = len(set([data["order"] for data in taxonomy.values()]))
    unique_families = len(set([data["family"] for data in taxonomy.values()]))

    model = HierarchicalPestClassifier(num_orders=unique_orders, num_families=unique_families)
    model.load_state_dict(torch.load("best_pest_model.pth", map_location="cpu"))
    model.eval()

    quantized_model = torch.ao.quantization.quantize_dynamic(model, {torch.nn.Linear}, dtype=torch.qint8)

    scripted_model = torch.jit.script(quantized_model)
    scripted_model.save("quantized_pest_model.pt")

    fp32_size = os.path.getsize("best_pest_model.pth") / (1024 * 1024)
    int8_size = os.path.getsize("quantized_pest_model.pt") / (1024 * 1024)

    print(f"FP32 Model Size: {fp32_size:.2f} MB")
    print(f"INT8 Model Size: {int8_size:.2f} MB")
    print(f"Compression: {fp32_size / int8_size:.1f}x smaller")


if __name__ == "__main__":
    quantize_model()
