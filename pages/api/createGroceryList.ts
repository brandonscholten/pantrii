import {NextApiHandler} from 'next';
import {addIngredient, createGroceryList} from '../../utils/utils';

const handler: NextApiHandler = async (req, res) => {
    createGroceryList(req.body.recipes);
    res.send('success');
}

export default handler;
