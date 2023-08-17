import {NextApiHandler} from 'next';
import {addIngredient, removeIngredient} from '../../utils/utils';

const handler: NextApiHandler = async (req, res) => {
    removeIngredient(req.body.ingredient);
    res.send('success');
}

export default handler;
