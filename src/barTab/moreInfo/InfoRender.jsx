import { FaGlobe, FaToilet, FaChair } from "react-icons/fa";
import { PiWheelchairFill } from "react-icons/pi";
import { GrCheckmark } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { ImSpinner2 } from "react-icons/im";

export default function InfoRender({ desc, info }) {
    return (
        <>
            <p>
                {desc}
            </p>

            <li>
                <FaToilet />
                {info.washroom ?
                    <GrCheckmark />
                    :
                    <RxCross1 />
                }
            </li>

            {info.website &&
                <li>
                    <FaGlobe />
                    <a
                        href={info.website}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {info.website}
                    </a>
                </li>
            }

            {info.outDoorSeating &&
                <li>
                    <FaChair />
                    <span>
                        Outdoor Seating:
                        {info.outDoorSeating ? ' Yes' : ' No'}
                    </span>
                </li>
            }

            <li>
                <PiWheelchairFill />
                <span>
                    Accessible Seating:
                    {info.accessibility.accessibleSeating ? ' Yes' : ' No'}
                </span>
            </li>

            <li>
                <PiWheelchairFill />
                <span>
                    Accessible Entrance:
                    {info.accessibility.accessibleEntrance ? ' Yes' : ' No'}
                </span>
            </li>

            <li>
                <PiWheelchairFill />
                <span>
                    Accessible Parking:
                    {info.accessibility.accessibleParking ? ' Yes' : ' No'}
                </span>
            </li>
        </>
    );
}