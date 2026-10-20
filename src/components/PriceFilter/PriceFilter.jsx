import { useState } from "react";
import styles from './PriceFilter.module.scss';
import { ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@mui/material";
import classNames from "classnames";


const valueText = (value) => {
    return (`$${value}`);
}

const PriceFilter = () => {
    const [isOpen, setIsOpen] = useState(true);

    const [value, setValue] = useState([100, 200]);

    const handleOnChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={styles.priceFillterWrapper}>
            <div className={styles.priceFillterHeader}>
                <h5>Price</h5>
                <button
                    className={styles.priceFillterBtn}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </button>
            </div>
            <div className={classNames(styles.priceSlection, {
                [styles.open]: isOpen,
            })}>
                <Slider
                    className={styles.customSlider}
                    getAriaLable={() => 'price range'}
                    value={value}
                    onChange={handleOnChange}
                    valueLabelDisplay='on'
                    valueLabelFormat={valueText}
                    getAriaValueText={valueText}
                    min={50}
                    max={250}
                    disableSwap
                />
            </div>
        </div>
    )
}

export default PriceFilter;