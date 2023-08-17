import {NextApiHandler} from 'next';
import {addIngredient, removeRecipe} from '../../utils/utils';

const handler: NextApiHandler = async (req, res) => {
    removeRecipe(req.body.recipe);
    res.send('success');
}

export default handler;
