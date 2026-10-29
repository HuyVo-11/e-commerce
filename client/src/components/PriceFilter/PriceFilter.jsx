import { useState } from "react";
import styles from './PriceFilter.module.scss';
import { ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@mui/material";
import classNames from "classnames";


const valueText = (value) => {
    return (`$${value}`);
}

const PriceFilter = ({ value, onChange, min = 0, max = 250 }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleOnChange = (e, newValue) => {
        onChange(newValue);
    };

    return (
        <div className={styles.priceFillterWrapper}>
            <div className={styles.priceFillterHeader}>
                <h2>Price</h2>
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
                    getAriaLabel={() => 'price range'}
                    value={value}
                    onChange={handleOnChange}
                    valueLabelDisplay='on'
                    valueLabelFormat={valueText}
                    getAriaValueText={valueText}
                    min={min}
                    max={max}
                    disableSwap
                />
            </div>
        </div>
    )
}

export default PriceFilter;