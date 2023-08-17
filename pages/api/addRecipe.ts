import {NextApiHandler} from 'next';
import {addIngredient, addRecipe} from '../../utils/utils';

const handler: NextApiHandler = async (req, res) => {
    addRecipe(req.body.recipe);
    res.send('success');
}

export default handler;
