import { Box, Button, FormHelperText, TextField } from "@mui/material"
import React from "react"



export const EditProfile = () => {
    const [newPassword, setNewPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [error, setError] = React.useState(false)

    const handleNewPassWordChange = (event) => {
        setNewPassword(event.target.value)
        setError(false)
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value)
        setError(false)
    }

    const onOkButtonClicked = () => {
        if (newPassword !== confirmPassword) {
            setError(true)
        } else {
            console.log('Change things')
        }
    }


    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                    '& .MuiButton-root': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
            >
                <h2>Edit Profile</h2>
                <TextField
                    id="outlined-read-only-input"
                    label="New Username"
                    variant="standard"
                />
                <TextField
                    id="outlined-password-input"
                    label="Current password"
                    type="password"
                    autoComplete="current-password"
                />
                <TextField
                    id="outlined-password-input"
                    label="New password"
                    type="password"
                    autoComplete="current-password"
                    value={newPassword}
                    onChange={handleNewPassWordChange}
                />
                <TextField
                    id="outlined-password-input"
                    label="Confirm password"
                    type="password"
                    autoComplete="current-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={error}
                />
                {error && <FormHelperText error>Passwords do not match</FormHelperText>}
                <Button variant="contained" onClick={onOkButtonClicked}>OK</Button>
            </Box>
        </div>

    )

}