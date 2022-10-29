import { Input } from '@chakra-ui/react'
import React from 'react'

const FormInput = ({value, setValue}) => {
    return (
        <Input 
            variant="flushed" 
            type="text"
            outline="none"
            border={"none"}
            borderBottom="1px solid #3535355c"
            width="100%"
            p="3px 0px"
            fontSize="16px"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

export default FormInput
