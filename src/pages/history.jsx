import { useState,useEffect } from "react";
import { historyByUser } from "@/action/fb_database";
import { halamanGameVerifikasi } from "@/action/games";
import { Container } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';

const History = (props) => {
    halamanGameVerifikasi()
    const [dataHistory, getDataHistory] = useState([])
    let score = []

    
    const getUserHistory = async  () => {
        let uid =  await localStorage.getItem('UID')
        let data =  await historyByUser(uid)
        getDataHistory(await data)
    }

    useEffect(() => {
        getUserHistory()
    },[])
    return(
        <div>
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>game_id</th>
                            <th>id_Player</th>
                            <th>Score</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    dataHistory.map((e) => (
                        <tr key={e.data}>
                            <td>{e.data.game_id}</td>
                            <td>{e.data.id_player}</td>
                            <td>{e.data.score}</td>
                            <td>{e.data.time}</td>
                        </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Container>    
        </div>
    )
}

export default History