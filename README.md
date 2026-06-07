# Pesti

<div align="center">
  <p>
    <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch" />
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
    <img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white" alt="Pandas" />
  </p>
</div>

Pesti is an agricultural insect and pest classification model trained with PyTorch. It generates the specialized model weights utilized by [FloraLens](https://github.com/abderrahmenex86/FloraLens) for mobile diagnostic and classification capabilities.

## Features

- **Resource-Efficient Architecture**: Employs a MobileNetV3-Large backbone with a customized classification head mapped directly to 102 target insect species.
- **Robust Dataset Handling**: Contains custom data parsing pipelines (`IP102Dataset`) to read the split directories of the IP102 dataset, with automatic fallback handling to bypass corrupted images on disk.
- **Label Smoothing Regularization**: Implements Cross-Entropy Loss with $0.1$ label smoothing to prevent overconfidence and improve test set generalization.
- **Dynamic Training Pipeline**: Configures training cycles using an AdamW optimizer, combined with a `CosineAnnealingLR` scheduler to scale the learning rate smoothly.
- **Evaluation Standards**: Monitors performance on out-of-sample data using Top-1 Accuracy, Top-5 Accuracy, and macro-averaged F1 Score.

## Tech Stack

- **Machine Learning Framework:** PyTorch, TorchVision
- **Metrics Evaluation:** TorchMetrics (Multiclass Accuracy, Multiclass F1 Score)
- **Data Engineering:** Pandas, Pillow
- **Progress Tracking:** tqdm

## Getting Started

### Prerequisites
- Python (v3.10+)
- CUDA-compatible GPU (highly recommended for training)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/abderrahmenex86/pesti.git
cd pesti
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Prepare the IP102 Dataset:**
Download the IP102 dataset and extract it to the local directory structure:
```text
ip102_v1.1/
├── images/
├── train.txt
├── val.txt
└── test.txt
```

4. **Run Training:**
```bash
python train.py
```
This script runs the training iterations, exports performance metrics to `training_history.json`, and saves the optimal validation parameters to `pest_model.pth`.

## Related Projects

- [FloraLens](https://github.com/abderrahmenex86/FloraLens) — Offline plant, pest, and disease diagnosis app
- [Flora](https://github.com/abderrahmenex86/flora) — Plant classification model
- [Segmenti](https://github.com/abderrahmenex86/segmenti) — Disease segmentation model
