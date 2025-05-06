import ESBOT from '../Photos/ESBOT.jpg'; 
import './Avatar.css';

function Avatar() {

    return(
        <div className='botdiv'>
        <img src={ESBOT} alt="ExcelSoft Bot Logo" className="Botlogo" />
        </div>
    );

}

export default Avatar