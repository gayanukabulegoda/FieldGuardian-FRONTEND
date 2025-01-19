import React, {useRef, useEffect} from 'react';

interface OtpInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
}

export const OtpInput: React.FC<OtpInputProps> = ({
                                                      length = 6,
                                                      value,
                                                      onChange,
                                                  }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Focus first input on mount
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index: number, inputValue: string) => {
        const newValue = value.split('');
        newValue[index] = inputValue;
        const combinedValue = newValue.join('');
        onChange(combinedValue);

        // Move to next input if value is entered
        if (inputValue && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            // Move to previous input on backspace if current input is empty
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
        onChange(pastedData);

        // Focus last input after paste
        const targetInput = inputRefs.current[pastedData.length - 1];
        if (targetInput) {
            targetInput.focus();
        }
    };

    return (
        <div className="otp-inputs">
            {Array.from({length}, (_, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    className="otp-input"
                    value={value[index] || ''}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                />
            ))}
        </div>
    );
};