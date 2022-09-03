import { useEffect } from "react";
import {generatePayload} from "../promptpay";
import {QRCodeSVG} from 'qrcode.react';
const Home = () =>{
	let ppID = "0909754062";
	let amount = 2000;
	let payload = generatePayload(ppID,amount);
	return (
		<>
		<h1>Home</h1>
		<QRCodeSVG value={payload} />
		</>
	)
}
export default Home;
