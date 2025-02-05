import { payments } from '@/ultils/Constant';
import React, { useCallback, useState } from 'react';
import InputMoneyRecharge from './InputMoneyRecharge';

const Payment = () => {
    const [toggle, setToggle] = useState(false);
    const [money, setMoney] = useState("");

    const togglePaymentOptions = () => {
        setToggle(prev => !prev)
    };

    return (
        <div className="flex flex-col m-8 gap-6 w-full">
            <span className="text-3xl font-bold text-gray-800">Nạp tiền vào tài khoản</span>

            {!toggle ? (
                <>
                    <span className="text-lg text-gray-600">
                        Bạn hãy chọn một trong các hình thức thanh toán dưới đây
                    </span>
                    <div className="w-full">
                        <div className="flex flex-wrap gap-4 justify-center">
                            {payments.map((el) => (
                                <div
                                    className="p-4 flex items-center justify-center w-[30%] h-[72px] bg-white shadow-md border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100"
                                    key={el.id}
                                    onClick={togglePaymentOptions}
                                >
                                    <span className="text-center text-xl">{el.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <InputMoneyRecharge money={money} setMoney={setMoney}/>
            )}
        </div>
    );
};

export default Payment;
