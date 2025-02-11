import express from 'express';
const router = express.Router();
import UserController from '../controllers/user.js'
import User from '../models/user.js'
let controller = new UserController()



// Route GET pour récupérer la liste des users 
router.get('/', (req, res) => {
    controller.createUser(new User("yanisArb","fehusjdjberhsjddbckel655661drez"))
    res.json({ message: 'Liste des produits' });
});

// Route GET pour un produit spécifique
router.get('/:id', (req, res) => {
  res.json({ message: `Produit ${req.params.id}` });
});

export default router;

