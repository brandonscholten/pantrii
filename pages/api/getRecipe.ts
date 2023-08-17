import {NextApiHandler} from 'next';
import {addIngredient, getRecipe} from '../../utils/utils';

const handler: NextApiHandler = async (req, res) => {
    getRecipe(req.body.recipe);
    res.send('success');
}

export default handler;
