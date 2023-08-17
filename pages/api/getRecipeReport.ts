import {NextApiHandler} from 'next';
import {addIngredient, getRecipeReport} from '../../utils/utils';

const handler: NextApiHandler = async (req, res) => {
    getRecipeReport(req.body.ingredients, req.body.recipe);
    res.send('success');
}

export default handler;
