import React, { useState } from 'react'

const LoadingButton: React.FC<{
    label: string,
    onClick: () => Promise<unknown>
    loadingLabel?: string
    className?: string
}> = ({ label, onClick, loadingLabel = "", className }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <button 
            type="button"
            disabled={isLoading}
            className={className ? className : "btn btn-primary"}
            onClick={() => {
                setIsLoading(true)
                onClick().finally(() => setIsLoading(false))
            }}
        >
            {isLoading 
                ? loadingLabel ? `${loadingLabel}...` : `${label}...`
                : `${label}`
            }
        </button>
    )
}

export default LoadingButton
