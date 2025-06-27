import Book from '../models/book.model.js';
import { Op } from 'sequelize';

export const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los libros' });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el libro' });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, pages, genre, description } = req.body;

    if (!title || !author || !pages || !genre)
      return res.status(400).json({ message: 'Faltan campos obligatorios' });

    const existing = await Book.findOne({ where: { title } });
    if (existing) return res.status(400).json({ message: 'El título ya existe' });

    const newBook = await Book.create({ title, author, pages, genre, description });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el libro' });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });

    const { title, author, pages, genre, description } = req.body;
    if (!title || !author || !pages || !genre)
      return res.status(400).json({ message: 'Faltan campos obligatorios' });

    const duplicate = await Book.findOne({
      where: {
        title,
        id: { [Op.ne]: req.params.id }
      }
    });
    if (duplicate)
      return res.status(400).json({ message: 'Título ya usado' });

    await book.update({ title, author, pages, genre, description });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el libro' });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });

    await book.destroy();
    res.json({ message: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el libro' });
  }
};
