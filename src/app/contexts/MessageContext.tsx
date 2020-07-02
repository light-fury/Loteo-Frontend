import React, {createContext, useState} from "react";
import {useTranslation} from "react-i18next";

import {MessagePanel, MessageType} from "common/components";
import {Dialog} from "ui/components";
import {TicketCart} from "loteo/types";
import {useBooleanState} from "hooks";
import {PaymentDialog} from "loteo/components";

interface MessageOptions {
    className?: string;
    title: string;
    text: string | React.ReactNode;
    ok?: () => void;
    cancel?: (() => void) | null;
    okText?: string;
    cancelText?: string;
}

interface MessageContextType {
    showSuccess(options: MessageOptions);

    showError(options: MessageOptions);

    showPayment(tickets: TicketCart, loteuDiv?: HTMLDivElement | undefined);
}

const MessageContext = createContext<MessageContextType>(null as any);
export default MessageContext;

type Props = {
    children: React.ReactNode;
};

export const MessageContextProvider = ({children}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "messageContextProvider";
    const [successMessageOptions, setSuccessMessageOptions] = useState<MessageOptions | null>(null);
    const [errorMessageOptions, setErrorMessageOptions] = useState<MessageOptions | null>(null);
    const [paymentDialogTickets, setPaymentDialogTickets] = useState<TicketCart | null>(null);
    const [scrollView, setScrollView] = useState<HTMLDivElement>();
    const [paymentDialogVisible, showPaymentDialog, hidePaymentDialog] = useBooleanState(false);

    const scrollToDiv = () => {
        if (scrollView && scrollView !== undefined) {
            scrollView.scrollIntoView({behavior: "smooth"});
        }
    };

    const value = {
        showSuccess: options =>
            setSuccessMessageOptions({
                ...options,
                ok: options.ok
                    ? () => {
                        if (options.ok) {
                            options.ok();
                        }
                        setSuccessMessageOptions(null);
                    }
                    : null,
                cancel:
                    options.cancel === null
                        ? null
                        : () => {
                            if (options.cancel) {
                                options.cancel();
                            }
                            setSuccessMessageOptions(null);
                        },
                cancelText: options.cancelText || t(`${TRANSLATE}.close`)
            }),
        showError: options =>
            setErrorMessageOptions({
                ...options,
                ok: options.ok
                    ? () => {
                        if (options.ok) {
                            options.ok();
                        }
                        setErrorMessageOptions(null);
                    }
                    : null,
                cancel:
                    options.cancel === null
                        ? null
                        : () => {
                            if (options.cancel) {
                                options.cancel();
                            }
                            setErrorMessageOptions(null);
                        },
                cancelText: options.cancelText || t(`${TRANSLATE}.close`)
            }),
        showPayment: (tickets, loteuDiv) => {
            setPaymentDialogTickets(tickets);
            if (loteuDiv) {
                setScrollView(loteuDiv);
            }
            showPaymentDialog();
        }
    };

    const hidePayment = () => {
        setPaymentDialogTickets(null);
        setScrollView(undefined);
        hidePaymentDialog();
    };

    return (
        <MessageContext.Provider value={value}>
            {children}
            {successMessageOptions && (
                <Dialog
                    className={`messageDialog ${
                        successMessageOptions.className ? successMessageOptions.className : ""
                    }`}
                >
                    <MessagePanel
                        type={MessageType.Success}
                        title={successMessageOptions.title}
                        text={successMessageOptions.text}
                        ok={successMessageOptions.ok}
                        okText={successMessageOptions.okText}
                        cancel={successMessageOptions.cancel || undefined}
                        cancelText={successMessageOptions.cancelText}
                    />
                </Dialog>
            )}
            {errorMessageOptions && (
                <Dialog
                    className={`messageDialog ${errorMessageOptions.className ? errorMessageOptions.className : ""}`}
                >
                    <MessagePanel
                        type={MessageType.Error}
                        title={errorMessageOptions.title}
                        text={errorMessageOptions.text}
                        ok={errorMessageOptions.ok}
                        okText={errorMessageOptions.okText}
                        cancel={errorMessageOptions.cancel || undefined}
                        cancelText={errorMessageOptions.cancelText}
                    />
                </Dialog>
            )}
            {paymentDialogVisible && paymentDialogTickets && (
                <PaymentDialog tickets={paymentDialogTickets} close={hidePayment} scrollToDiv={scrollToDiv} />
            )}
        </MessageContext.Provider>
    );
};
