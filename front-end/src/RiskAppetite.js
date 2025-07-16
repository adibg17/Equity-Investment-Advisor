import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
export const RiskAppetite = (risk_appetite, percentage, savings) => {
    switch (risk_appetite) {
      case "HIGH": {
        if (percentage >= 50) {
          return (
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Since you've chosen high risk appetite, consider investing in high
                return assests such as small cap stocks having high growth
                potential and into NFTs and Cryptocurrency.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                We would advise you to invest in Railway Stocks such as
                {CalculateRiskAppetite(0.7 * savings)} IRFC-CMP-176, RVNL-CMP-320
                and into PSU stocks such as NBCC-CMP-88
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                {CalculateRiskAppetite(0.2 * savings)} In the cryptocurrency asset
                class invest in BITCOIN and ETHEREUM
              </ListItem>
              {/* You can also use custom icons from react-icons */}
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Keep aside 10% of your savings for emergency purposes
              </ListItem>
            </List>
          );
        } else if (percentage >= 20 && percentage <= 50) {
          return (
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                since you've chosen high risk appetite and your savings is between
                20-50%, consider investing in a combination of asset classes such
                as mid cap Stocks, ETF and Mutual Funds and REIT'S.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                You can invest {CalculateRiskAppetite(0.55 * savings)} in
                Established companies like SAIL-CMP-114, CROMPTON-CMP-325, REC
                LTD-CMP-458 each month. Since these are Mid Cap Stocks they have
                huge growth potential
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Also you can do a sip of {CalculateRiskAppetite(0.3 * savings)} in
                NIPPON INDIA EQUITY growth mutual fund which has a 3Y return of
                12%
              </ListItem>
              {/* You can also use custom icons from react-icons */}
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Set aside 15% for emergency purposes
              </ListItem>
            </List>
          );
        } else {
          return (
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Since you have very less savings rate and want high return invest
                {CalculateRiskAppetite(0.9 * savings)} of your money in
                fundamentally strong small Cap stocks such as RVNL, IRFC, LEMON
                TREE HOTELS
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                {CalculateRiskAppetite(0.1 * savings)} for emergency purposes
              </ListItem>
            </List>
          );
        }
      }
  
      case "MEDIUM": {
        if (percentage >= 50) {
          return (
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Since you've chosen medium risk appetite invest
                {CalculateRiskAppetite(0.5 * savings)} in Samll cap equity based
                mutual funds recommended mutual fund is NIPPON INDIA SMALL CAP
                GROWTH FUND with a current NAV of 140.769
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                As you are willing to take medium risk consider setting aside
                {CalculateRiskAppetite(0.25 * savings)} for emergency purposes
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                And the rest {CalculateRiskAppetite(0.25 * savings)} invest in 2
                or 3 well established companies like RELIANCE, TCS and INFOSYS
              </ListItem>
            </List>
          );
        } else if (percentage >= 20 && percentage <= 50) {
          return (
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Since you are willing to risk some amount of money invest
                {CalculateRiskAppetite(0.75 * savings)} in a combination of small
                and mid cap mutual funds. Invest in FLEXICAP HYBRID GROWTH MODEL
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Save {CalculateRiskAppetite(0.25 * savings)} for emergency
                purposes
              </ListItem>
            </List>
          );
        } else {
          return (
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Save {CalculateRiskAppetite(0.2 * savings)} for emergency purposes
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Invest {CalculateRiskAppetite(0.8 * savings)} into NIPPON INDIA
                MIDCAP FUND
              </ListItem>
            </List>
          );
        }
      }
      case "LOW": {
        if (percentage >= 50) {
          return (
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Since you've opted for low risk appetite invest{" "}
                {CalculateRiskAppetite(0.7 * savings)} in a hybrid growth fund
                such as ICICI hybrid growth fund
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Keep {CalculateRiskAppetite(0.3 * savings)} aside in case of
                emergency purposes
              </ListItem>
            </List>
          );
        } else if (percentage >= 20 && percentage <= 50) {
          return (
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Save atleast {CalculateRiskAppetite(0.5 * savings)} amount for any
                unforeseen circumstances
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Invest in a ICICI FLEXICAP FUND
              </ListItem>
            </List>
          );
        } else {
          return (
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Since you have very little savings and also low risk appetite
                invest {CalculateRiskAppetite(0.6 * savings)} in QUANTI Multi
                asset fund which has a Nav-111 and a healthy growth rate of 12%
                YOY
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Keep aside {CalculateRiskAppetite(0.4 * savings)} for emergency
                purposes
              </ListItem>
            </List>
          );
        }
      }
    }
  };
  
  const CalculateRiskAppetite = (rate, savings) => {
    return parseInt(rate, savings);
  };