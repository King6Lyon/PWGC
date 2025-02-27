import Document from '../models/Document.js';
import mongoose from 'mongoose';

// Ajouter un document
export const addDocument = async (req, res) => {
  try {
    const { category, sub_category, control_id, description, file_url } = req.body;

    const newDocument = new Document({
      category,
      sub_category,
      control_id,
      description,
      file_url,
      uploaded_by: req.user._id
    });

    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du document.', error });
  }
};

// Obtenir tous les documents
export const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find().populate('uploaded_by', 'name email');
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des documents.', error });
  }
};

// Supprimer un document
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await Document.findByIdAndDelete(id);
    res.status(200).json({ message: 'Document supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du document.', error });
  }
};
