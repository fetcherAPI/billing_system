import React, { ErrorInfo, ReactNode, Suspense } from 'react'
import { ErrorPage } from '../../../../widgets/ErrorPage/ui/ErrorPage'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error) {
        console.log(error);
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo)

        this.sendErrorToServer(error, errorInfo)
    }

    getLocalIpAddress() {
        return new Promise((resolve) => {
            const pc = new RTCPeerConnection()
            pc.createDataChannel('')
            pc.createOffer().then((offer) => pc.setLocalDescription(offer))
            pc.onicecandidate = (event) => {
                if (event && event.candidate && event.candidate.address) {
                    resolve(event.candidate.address)
                    pc.close()
                }
            }
        }).catch(() => 'Unavailable')
    }

    sendErrorToServer(error: Error, errorInfo: ErrorInfo) {
        console.log(errorInfo);
        console.log(error)
    }

    render() {
        const { hasError } = this.state
        const { children } = this.props

        if (hasError) {
            return (
                <Suspense fallback="">
                    <ErrorPage />
                </Suspense>
            )
        }

        return children
    }
}

export default ErrorBoundary
