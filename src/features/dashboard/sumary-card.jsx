import { Box, Typography } from "@mui/material"
import { EXPENSE_COLOR, EXPENSE_COLOR_WITH_OPACITY } from "../../utils/expense-color"

export const SummaryCard = ({amount, paymentMethod}) => {
    return (<Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '250px', height: '250px',
        padding: '10px', backgroundColor: `${EXPENSE_COLOR_WITH_OPACITY[paymentMethod]}`, borderBottom: `5px solid ${EXPENSE_COLOR[paymentMethod]}`, borderRadius: '10px'}}>
        <Typography variant="subtitle1" gutterBottom>
          {paymentMethod}
        </Typography>
        <Typography variant="button">
          R$ {amount}
        </Typography>
    </Box>)
}