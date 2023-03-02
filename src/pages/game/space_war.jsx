import { useEffect, useCallback} from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { Container} from "react-bootstrap";
import Navbar from "../../components/Navbar";
import { halamanGameVerifikasi, insertGameScore } from "../../action/games";
import Link from 'next/link'
// import { useAuth } from "@/action/fb_storage";
// https://react-unity-webgl.dev/
// https://github.com/jeffreylanters/react-unity-webgl/discussions/264

const GameSpaceWar = () => {
  // const [isLogin, setIsLogin] = useState(true);
  // const currentUser = useAuth();

  const game_id = "-NG-FxcdZAq13GcqcZIm";
  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "/game/space_war/BinarSpaceWar.loader.js",
      dataUrl: "/game/space_war/BinarSpaceWar.data.unityweb",
      frameworkUrl: "/game/space_war/BinarSpaceWar.framework.js.unityweb",
      codeUrl: "/game/space_war/BinarSpaceWar.wasm.unityweb",
    });

  // sendMessage("JavascriptHook", "ChangeData", "HarlanSR");

    const handleGameOver = useCallback(async (userName2, score) => {
        insertGameScore(game_id, await localStorage.getItem('UID'), score);
    }, []);

    useEffect( () => {
      halamanGameVerifikasi()
    }, []);


    useEffect(() => {
        addEventListener("GameOver", handleGameOver);
        return () => {
            removeEventListener("GameOver", handleGameOver);
        };
    }, [addEventListener, removeEventListener, handleGameOver]);

    return (
        <div style={{ backgroundColor: '#2B2D33', color: '#fff', height:"100vh" }}>
            <Navbar bgColor="#4A4A5C"/>
            <Container className="mt-5" >

                <div className="p-5">
                    <Unity
                        style={{
                            width: "100%",
                            justifySelf: "center",
                            alignSelf: "center",
                        }}
                        unityProvider={unityProvider} />
                </div>
                <Link type="submit" href='/pdfview'className="btn btn-primary" style={{position:'absolute', bottom:'55px', right: '15px'}}>Get History</Link>
            </Container>
        </div>
  );
};

export default GameSpaceWar;
