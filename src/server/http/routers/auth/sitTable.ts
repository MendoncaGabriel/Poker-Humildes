import { Request, Response, Router } from 'express';
import { insertPlayerInTable } from '../../../../game/game';

const router = Router();
router.get('/sentar-ne-mesa', (req: Request, res: Response) => {
    const {playerId, playerName } = req.body

    try{
        const result =  insertPlayerInTable({
            id: playerId,
            name: playerName
        })
        res.status(200).json(result)
    }catch(error){
        res.status(400).json(error)
    }


});

export default router;
