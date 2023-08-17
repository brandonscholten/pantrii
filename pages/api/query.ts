import {NextApiHandler} from 'next';
import {addIngredient, query} from '../../utils/utils';

const handler: NextApiHandler = async (req, res) => {
    query(req.body.ingredients, req.body.byPrice);
    res.send('success');
}

export default handler;
