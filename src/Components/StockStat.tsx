import React, { FC } from 'react';
import { Stat, StatArrow, StatHelpText, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/core';

type statArrowProp = "increase" | "decrease" | undefined

interface props {
  name: string;
  price: number;
  priceChange: statArrowProp;
  priceChangePercent?: number ;

}

const StockStat: FC<props> = ({name, price, priceChange, priceChangePercent}) => {
  const bgIncrease = useColorModeValue("green.100", "green.300")
  const bgDecrease = useColorModeValue("red.100", "red.300")
  const bg = priceChange === 'increase' ? bgIncrease : bgDecrease
  return (
    <Stat
      minWidth={["2.5rem", "2rem"]}
      margin="0.5em"
      padding="1em"
      borderRadius={["0.5em", "1em"]}
      boxShadow="xl"
      bg={priceChange ? bg : ''}
    >
      <StatLabel>{name}</StatLabel>
      <StatNumber fontSize={["md", "2xl"]}>{price}</StatNumber>
      <StatHelpText fontSize={['xs', 'md']}>
        <StatArrow boxSize={['2', '3']} type={priceChange} />
        {`${priceChangePercent || 0}%`}
      </StatHelpText>
    </Stat>
  );
}

export default StockStat;