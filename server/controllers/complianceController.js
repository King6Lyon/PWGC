import Compliance from '../models/Compliance.js';

//  Obtenir tous les contrôles de conformité
export const getAllCompliances = async (req, res) => {
  try {
    const compliances = await Compliance.find();
    res.json(compliances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Ajouter un nouveau contrôle de conformité
export const addCompliance = async (req, res) => {
  try {
    const { category, sub_category, control_id, level, description, status, comment } = req.body;

    const existingControl = await Compliance.findOne({ control_id });
    if (existingControl) {
      return res.status(400).json({ message: "Ce contrôle existe déjà." });
    }

    const newCompliance = new Compliance({
      category,
      sub_category,
      control_id,
      level,
      description,
      status: isNaN(status) ? 0 : status, 
      comment: comment || "" 
    });

    await newCompliance.save();
    res.status(201).json(newCompliance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  Mettre à jour un contrôle de conformité
export const updateCompliance = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const compliance = await Compliance.findByIdAndUpdate(id, updatedData, { new: true });

    if (!compliance) {
      return res.status(404).json({ message: "Contrôle non trouvé" });
    }

    res.json(compliance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  Supprimer un contrôle de conformité
export const deleteCompliance = async (req, res) => {
  try {
    const { id } = req.params;

    const compliance = await Compliance.findByIdAndDelete(id);

    if (!compliance) {
      return res.status(404).json({ message: "Contrôle non trouvé" });
    }

    res.json({ message: "Contrôle supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
