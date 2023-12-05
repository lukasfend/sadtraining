"use client";
import { useState } from "react";
import "./order_page.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { RSIconUrl } from "@/helpers/IconUrlHelper";

const RootPage = () => {
    const [subService, setSubService] = useState("none");
    const [rsName, setRsName] = useState("");
    const [capeType, setCapeType] = useState("none");
    const [stoneCount, setStoneCount] = useState(0);
    const [levels, setLevels] = useState({
        attack: 0, strength: 0, defence: 0, ranged: 0, magic: 0, prayer: 0, constitution: 0, necromancy: 0,
        herblore: 0, invention: 0, summoning: 0
    }); // cape selection
    const [comments, setComments] = useState("");

    // cape selection


    const handleSetSubService = (e: any) => {
        setSubService(e.target.id)
    };
    const handleSetCapeType = (e: any) => {
        setCapeType(e.target.id);
    };
    const handleRequestCapeService = (e: any) => {
        e.preventDefault();
        axios.post("/api/order/create", {
            orderType: "CAPE_SERVICE",
            isIronman: false,
            payload: {
                rsName,
                capeType,
                stoneCount,
                initialLevels: levels,
                comments
            }
        }).then(response => {
            if (response.data.success) alert("Your service request has been sent!");
            return;
        }).catch(error => {
            console.error(error);
        });
    };

    return <div className="order_page">
        <div className="banner">
            <span className="main">SAD{"\'"}S</span>
            <span className="sub">Training Services</span>
        </div>

        <div className="order">

            <div className="header"></div>

            <div id="quest" className={"type_button" + (subService === "quest" ? " active" : "")} onClick={handleSetSubService}>
                <Image
                    width={50}
                    height={50}
                    src="https://runescape.wiki/images/thumb/Quest.png/21px-Quest.png?d403d" alt="Icon" /><span>Questing</span>
            </div>
            <div id="achievements" className={"type_button" + (subService === "achievements" ? " active" : "")} onClick={handleSetSubService}>
                <Image
                    width={50}
                    height={50}
                    src="https://runescape.wiki/images/Task_icon.png?fed7b" alt="Icon" /><span>Achievements</span>
            </div>
            <div id="pvm" className={"type_button" + (subService === "pvm" ? " active" : "")} onClick={handleSetSubService}>
                <Image
                    width={50}
                    height={50}
                    src="https://runescape.wiki/images/Combat_icon_large.png?be4a3" alt="Icon" /><span>PVM</span>
            </div>
            <div id="leveling" className={"type_button" + (subService === "leveling" ? " active" : "")} onClick={handleSetSubService}>
                <Image
                    width={50}
                    height={50}
                    src="https://runescape.wiki/images/thumb/Statistics.png/21px-Statistics.png?ad17c" alt="Icon" /><span>Leveling</span>
            </div>
            <div id="cape" className={"type_button" + (subService === "cape" ? " active" : "")} onClick={handleSetSubService}>
                <Image
                    width={50}
                    height={50}
                    src="https://runescape.wiki/images/Igneous_Kal-Zuk.png?21cb9" alt="Icon" /><span>Cape Services</span>
            </div>
            <div id="custom" className={"type_button" + (subService === "custom" ? " active" : "")} onClick={handleSetSubService}>
                <Image
                    width={50}
                    height={50}
                    src="https://runescape.wiki/images/Provoke.png?7fa4a" alt="Icon" /><span>Custom Request</span>
            </div>

            <div className="customize_order">
                <form>


                    {subService === "cape" && <div className="fire_cape">
                        <h5>Customize your order</h5>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="left">Which TokHaar-Kal Cape do you want?</td>
                                    <td>
                                        <div className="cape_selector">
                                            <div id="fire_cape" onClick={handleSetCapeType} className={capeType === "fire_cape" ? "active" : ""}>
                                                <Image src="https://runescape.wiki/images/Fire_cape.png?21a99" width={50} height={50} alt="" />
                                                Basic Fire Cape
                                            </div>
                                            <div id="melee" onClick={handleSetCapeType} className={capeType === "melee" ? "active" : ""}>
                                                <Image src="https://runescape.wiki/images/TokHaar-Kal-Ket.png?e0cfc" width={50} height={50} alt="" />
                                                Ket (Melee)
                                            </div>
                                            <div id="ranged" onClick={handleSetCapeType} className={capeType === "ranged" ? "active" : ""}>
                                                <Image src="https://runescape.wiki/images/TokHaar-Kal-Xil.png?e0cfc" width={50} height={50} alt="" />
                                                Xil (Ranged)
                                            </div>
                                            <div id="magic" onClick={handleSetCapeType} className={capeType === "magic" ? "active" : ""}>
                                                <Image src="https://runescape.wiki/images/TokHaar-Kal-Mej.png?e0cfc" width={50} height={50} alt="" />
                                                Mej (Magic)
                                            </div>
                                            <div id="necromancy" onClick={handleSetCapeType} className={capeType === "necromancy" ? "active" : ""}>
                                                <Image src="https://runescape.wiki/images/TokHaar-Kal-Mor.png?e0cfc" width={50} height={50} alt="" />
                                                Mor (Necromancy)
                                            </div>
                                            <div id="none" onClick={handleSetCapeType} className={capeType === "none" ? "active" : ""}>
                                                None (just the Igneous Stone)
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="left">Enter your RuneScape name:<br /><i>
                                        This is to automatically load your combat stats</i></td>
                                    <td className="rsAccount">
                                        <input type="text" required className="nick" value={rsName} onChange={e => { setRsName(e.target.value) }} placeholder="RS3 Nickname" />
                                        <button className="nick_button"><FontAwesomeIcon icon={faCheck} /></button>
                                        <br />
                                        Levels:{' '}
                                        <span className="level">
                                            <Image src={RSIconUrl.ATTACK} alt="" width={30} height={30} />
                                            {levels.attack}
                                        </span>
                                        <span className="level">
                                            <Image src={RSIconUrl.STRENGTH} alt="" width={30} height={30} />
                                            {levels.strength}
                                        </span>
                                        <span className="level">
                                            <Image src={RSIconUrl.DEFENCE} alt="" width={30} height={30} />
                                            {levels.defence}
                                        </span>
                                        <span className="level">
                                            <Image src={RSIconUrl.RANGED} alt="" width={30} height={30} />
                                            {levels.ranged}
                                        </span>
                                        <span className="level">
                                            <Image src={RSIconUrl.NECROMANCY} alt="" width={30} height={30} />
                                            {levels.necromancy}
                                        </span>
                                        <span className="level">
                                            <Image src={RSIconUrl.MAGIC} alt="" width={30} height={30} />
                                            {levels.magic}
                                        </span>
                                        <span className="level">
                                            <Image src={RSIconUrl.PRAYER} alt="" width={30} height={30} />
                                            {levels.prayer}
                                        </span>
                                        <span className="level">
                                            <Image src={RSIconUrl.CONSTITUTION} alt="" width={30} height={30} />
                                            {levels.constitution}
                                        </span>
                                        <span className="level">
                                            <Image src={RSIconUrl.HERBLORE} alt="" width={30} height={30} />
                                            {levels.herblore}
                                        </span>
                                        <span className="level">
                                            <Image src={RSIconUrl.INVENTION} alt="" width={30} height={30} />
                                            {levels.invention}
                                        </span>
                                        <span className="level">
                                            <Image src={RSIconUrl.SUMMONING} alt="" width={30} height={30} />
                                            {levels.summoning}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="left">How many Igneous Stones do you want?</td>
                                    <td>
                                        <input required type="number" value={stoneCount} onChange={e => { setStoneCount(parseInt(e.target.value)) }} className="quantity" placeholder="1" min={0} max={4} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="left">What{"\'"}s your gear?<br /><i>Feel free to add comments</i></td>
                                    <td>
                                        <textarea required placeholder="Describe your current gear (e.g. Full Sirenic, Masterwork, Bandos armor etc.)" className="commentText" rows={4} value={comments} onChange={e => { setComments(e.target.value) }}></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <button className="submit" onClick={handleRequestCapeService}>Send Service Request</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>}


                </form>
            </div>

        </div>


    </div>;
};

export default RootPage;