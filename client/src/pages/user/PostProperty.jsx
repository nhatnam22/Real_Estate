import { React, useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { BsTag } from "react-icons/bs";
import { IoKeyOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogOverlay,
} from '@radix-ui/react-dialog';
import { PopUpAddress } from '@/components/address';
import { ConfigAndPayment, InfomationProperty, ProcessBar, Upload } from '@/components/postProperty';
import SelectAddress from '@/components/address/SelectAddress';
import { GetTypePropertyRequest } from '@/api/GetTypePropertyRequest';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IncreButton } from '@/components/inputs';
import { GetAllDirection } from '@/api/GetAllDirection';
import { useNavigate } from 'react-router-dom';
import { PostFieldProperty } from '@/api/PostFieldProperty';
import { useSelector } from 'react-redux';
import { formatDateTime, totalDate } from '@/ultils/Helper';
import Swal from 'sweetalert2';
import { auth } from "@/ultils/firebase"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"


const PostProperty = () => {
    const {isLoggedIn} = useSelector(state => state.auth)
    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container", // ID của container để hiển thị reCAPTCHA
            { size: "invisible" },
            auth
          );
        }
      };
    
      // Hàm gửi OTP
      const sendOTP = (phoneNumber) => {
        setupRecaptcha();
    
        const appVerifier = window.recaptchaVerifier;
    
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            Swal.fire("Thành công!", "OTP đã được gửi!", "success");
          })
          .catch((error) => {
            console.error("Lỗi khi gửi OTP:", error);
            Swal.fire("Lỗi!", "Không thể gửi OTP. Vui lòng thử lại.", "error");
          });
      };
    
      useEffect(() => {
        if (!isLoggedIn) {
          Swal.fire({
            title: "Bạn chưa đăng nhập!",
            text: "Vui lòng đăng nhập để tiếp tục.",
            icon: "warning",
            confirmButtonText: "Về trang chủ",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        } else {
          Swal.fire({
            title: "Hãy cung cấp số điện thoại để nhận OTP!",
            input: "text",
            inputPlaceholder: "Nhập số điện thoại",
            inputAttributes: {
              maxlength: 10,
              pattern: "[0-9]*",
              title: "Số điện thoại hợp lệ phải chứa 10 chữ số",
            },
            showCancelButton: true,
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Hủy",
          }).then((result) => {
            const phone = result.value;
            if (result.isConfirmed && phone) {
              // Kiểm tra định dạng số điện thoại
              if (/^\d{10}$/.test(phone)) {
                sendOTP(phone);
              } else {
                Swal.fire(
                  "Lỗi!",
                  "Số điện thoại không hợp lệ. Vui lòng nhập lại.",
                  "error"
                );
              }
            }
          });
        }
      }, [isLoggedIn])

    const navigate = useNavigate()
    const exitNavigate = () => {
        navigate('/')
    }
    //state on off
    const [variant, setVariant] = useState(false)
    const [variantAddress, setVariantAddress] = useState(false)
    const [variantKeyInfo, setVariantKeyInfo] = useState(false)
    const [variantAnotherInfo, setVariantAnotherInfo] = useState(false)
    const [variantPrivateInfo, setVariantPrivateInfo] = useState(false)
    const [variantTitle, setVariantTitle] = useState(false)
    const handleClickVariant = () => {
        setVariant(!variant)
    }
    const handleClickVariantAddress = () => {
        setVariantAddress(!variantAddress)
    }
    const handleClickVariantKeyInfo = () => {
        setVariantKeyInfo(!variantKeyInfo)
    }
    const handleClickVariantAnotherInfo = () => {
        setVariantAnotherInfo(!variantAnotherInfo)
    }
    const handleClickVariantPrivateInfo = () => {
        setVariantPrivateInfo(!variantPrivateInfo)
    }
    const handleClickVariantTitle = () => {
        setVariantTitle(!variantTitle)
    }
    //state listingType
    const [listingType, setListingType] = useState("")
    //state address
    const [addressTotal, setAddressTotal] = useState("")
    //state processBar
    const [step, setStep] = useState(1)
    const [process, setProcess] = useState([1])
    const onHandleNext = () => {
        setProcess((prev) => {
            const newProcess = [...prev, step + 1];
            return newProcess;
        });

        setStep(step + 1);
    };
    const onHandleBack = () => {
        if (step === 1) return step
        setProcess((prev) => {
            prev.pop()
            return prev
        })
        setStep(step - 1)

    }
    //state infomation another
    const [bedroom, setBedroom] = useState(0)
    const [bathroom, setBathroom] = useState(0)
    const [floor, setFloor] = useState(0)
    const [directors, setDirectors] = useState([])
    const [director, setDirector] = useState("")
    const AnotherInfoChoosed = bedroom && bathroom && floor && director ?
        `- Nội thất: 
    - Số phòng ngủ: ${bedroom} phòng
    - Số phòng tấm: ${bathroom} phòng
    - Hướng nhà: ${director}
    - Số tầng: ${floor}
    `: null
    const handleSetBedroom = useCallback((value) => setBedroom(value), []);
    const handleSetBathroom = useCallback((value) => setBathroom(value), []);
    const handleSetFloor = useCallback((value) => setFloor(value), []);
    //state information primary
    const [areaValue, setAreaValue] = useState("")
    const [priceValue, setPriceValue] = useState("")
    const [types, setTypes] = useState([])
    const [type, setType] = useState("")
    const KeyInfoChoosed = type && priceValue && areaValue ? `${type} ${priceValue} ${areaValue}` : null
    // state information identity
    const { current, email: reduxEmail } = useSelector((state) => state.userInfo)
    const [email, setEmail] = useState(reduxEmail)
    const [phone, setPhone] = useState("")
    const [name, setName] = useState(current)
    const PrivateInfoChoosed = name && email && phone ? `${name} ${email} ${phone}` : null

    const onClickListingType = (type) => {
        setListingType(type);
        setVariant(false)
        setVariantAddress(true)
    }
    useEffect(() => {
        if (addressTotal !== "") {
            setVariantAddress(false);
            setVariantKeyInfo(true);
        }
    }, [addressTotal]);

    // call api propertyType and direction
    useEffect(() => {
        const fetchPropertyType = async () => {
            const response = await GetTypePropertyRequest()
            response && setTypes(el => el.concat(response))
        }
        fetchPropertyType()
    }, [])
    useEffect(() => {
        const fetchPropertyDirectors = async () => {
            const response = await GetAllDirection()
            response && setDirectors(response.data)
        }
        fetchPropertyDirectors()
    }, [])
    //Infomation Property
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    //images
    const [uploadedUrls, setUploadedUrls] = useState([]);
    //expired-date
    const [packageValue, setPackagevalue] = useState("Tin Thường")
    const [combo, setCombo] = useState("7 ngày")
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState("")
    const isStep1Valid = () => {
        return (
            listingType !== "" &&
            addressTotal !== "" &&
            type !== "" &&
            priceValue !== "" &&
            areaValue !== "" &&
            director !== "" &&
            floor !== "" &&
            bathroom !== "" &&
            bedroom !== "" &&
            name !== "" &&
            phone !== "" &&
            email !== ""
        )
    }
    const isStep2Valid = () => {
        return uploadedUrls.length === 3;
    };

    const isNextDisabled = () => {
        if (step === 1) return !isStep1Valid()
        if (step === 2) return !isStep2Valid()
        return false;
    };
    const sendData = () => {
        const payload = {
            "listing-type": listingType,
            "address": addressTotal,
            "bathroom": bathroom,
            "bedroom": bedroom,
            "property-type": type,
            "price": priceValue,
            "size": areaValue,
            "floor": floor,
            "direction": director,
            "poste-by": name,
            "email": email,
            "phone": phone,
            "name": title,
            "description": description,
            "images": uploadedUrls,
            "expired-date": formatDateTime(totalDate(combo, date)),
            "expired-boost": formatDateTime(totalDate(combo, date))
        }
        const requestPostProperty = async () => {
            const response = await PostFieldProperty(payload)
            console.log(response)
        }
        requestPostProperty()
    }
    return (
        <div className='w-screen'>
            <div className='flex items-center justify-between py-3 px-5'>
                <span><h1 className="font-bold text-2xl">Tạo tin đăng</h1></span>
                <Button variant='outline' className='rounded-full p-6' onClick={exitNavigate}>Thoát</Button>
            </div>
            <div className='px-5 text-md font-semibold'>
                Thông tin BĐS
            </div>
            <ProcessBar process={process} />
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    if (step === 3) {
                        if (isStep1Valid() && isStep2Valid()) {
                            sendData();
                        }
                    }
                }}
            >
                {step == 1 && (<div className='w-full'>
                    <div className='w-full mt-3 flex items-center justify-center'>
                        <InfomationProperty variant={variant} onClickVariant={handleClickVariant} title="Nhu Cầu" choose={listingType}>
                            <div
                                onClick={() => onClickListingType("SOLD")}
                                className={twMerge(clsx(listingType === "SOLD" ? "bg-stone-300" : "", 'flex flex-col flex-1 text-xl border border-stone-300 rounded-xl p-4 hover:bg-stone-300'))}
                            >
                                <span><IoKeyOutline /></span>
                                <span>Bán</span>
                            </div>
                            <div
                                onClick={() => onClickListingType("RENTAL")}
                                className={twMerge(clsx(listingType === "RENTAL" ? "bg-stone-300" : "", 'flex flex-col flex-1 text-xl border border-stone-300 rounded-xl p-4 hover:bg-stone-300'))}
                            >
                                <span><BsTag /></span>
                                <span>Cho Thuê</span>
                            </div>
                        </InfomationProperty>
                    </div>
                    {listingType !== "" && <div className='w-full mt-3 flex items-center justify-center'>
                        <InfomationProperty variant={variantAddress} onClickVariant={handleClickVariantAddress} title="Địa chỉ BDS" choose={addressTotal}>
                            <Dialog className='w-full'>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="border border-stone-300 rounded-full w-full flex items-center gap-3 p-6 cursor-pointer justify-start text-md">
                                        <span><IoIosSearch /></span>
                                        <span>Nhập địa chỉ</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogOverlay className="fixed inset-0 z-40 bg-black/80" />
                                <DialogContent className="w-[50%] p-0 fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white shadow-lg duration-200 sm:rounded-lg">
                                    <div className='bg-black rounded-tr-lg rounded-tl-lg text-white p-4'><span className='text-xl font-bold'>Nhập địa chỉ</span></div>
                                    <DialogTitle></DialogTitle>
                                    <PopUpAddress value={addressTotal} setValue={setAddressTotal} />
                                </DialogContent>
                            </Dialog>
                        </InfomationProperty>
                    </div>}
                    {addressTotal !== "" && <div className='w-full mt-3 flex items-center justify-center'>
                        <InfomationProperty variant={variantKeyInfo} onClickVariant={handleClickVariantKeyInfo} title="Thông tin chính" choose={KeyInfoChoosed}>
                            <div className='w-full flex flex-col gap-4'>
                                <SelectAddress type="Loại BDS" id="Loại BĐS" items={types} value={type} setValue={setType} />
                                <div>
                                    <label htmlFor='Diện tích'>Diện tích</label>
                                    <Input id='Diện tích' value={areaValue} onChange={e => setAreaValue(e.target.value)} placeholder='Nhập diện tích'></Input>
                                </div>
                                <div>
                                    <label htmlFor='Mức giá'>Mức giá</label>
                                    <Input id='Mức giá' value={priceValue} onChange={e => setPriceValue(e.target.value)} placeholder='Nhập giá'></Input>
                                </div>
                            </div>
                        </InfomationProperty>
                    </div>}
                    {type !== "" && priceValue !== "" && areaValue !== "" && <div className='w-full mt-3 flex items-center justify-center'>
                        <InfomationProperty variant={variantAnotherInfo} onClickVariant={handleClickVariantAnotherInfo} title="Thông tin khác" choose={AnotherInfoChoosed}>
                            <div className='w-full flex flex-col gap-4'>
                                <div>
                                    <label htmlFor='Nội Thất'>Nội Thất</label>
                                    <Input id='Nội Thất' placeholder='Chọn Nội Thất'></Input>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='font-semibold'>Số phòng ngủ</span>
                                    <IncreButton value={bedroom} setValue={handleSetBedroom} />
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='font-semibold'>Số phòng tắm, vệ sinh</span>
                                    <IncreButton value={bathroom} setValue={handleSetBathroom} />
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='font-semibold'>Số tầng</span>
                                    <IncreButton value={floor} setValue={handleSetFloor} />
                                </div>
                                <SelectAddress type="Hướng Nhà" id="Hướng Nhà" items={directors} value={director} setValue={setDirector} />
                            </div>
                        </InfomationProperty>
                    </div >}
                    {director !== "" && floor !== "" && bathroom !== "" && bedroom !== "" && <div className='w-full mt-3 flex items-center justify-center'>
                        <InfomationProperty variant={variantPrivateInfo} onClickVariant={handleClickVariantPrivateInfo} title="Thông tin cá nhân" choose={PrivateInfoChoosed}>
                            <div className='w-full flex flex-col gap-4'>
                                <div>
                                    <label htmlFor='Tên Liên Hệ'>Tên Liên Hệ</label>
                                    <Input id='Tên Liên Hệ' value={name} onChange={e => setName(e.target.value)} placeholder='Nhập tên liên hệ'></Input>
                                </div>
                                <div>
                                    <label htmlFor='email'>email</label>
                                    <Input id='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Nhập email'></Input>
                                </div>
                                <div>
                                    <label htmlFor='Số điện thoại'>Số điện thoại</label>
                                    <Input id='Số điện thoại' value={phone} onChange={e => setPhone(e.target.value)} placeholder='Nhập số điện thoại'></Input>
                                </div>
                            </div>
                        </InfomationProperty>
                    </div>}
                    {name !== "" && phone !== "" && email !== "" && <div className="w-full mt-3 flex items-center justify-center">
                        <InfomationProperty variant={variantTitle} onClickVariant={handleClickVariantTitle} title="Tiêu đề và mô tả">
                            <div className="w-full flex flex-col gap-4">
                                <div className="w-full">
                                    <label htmlFor="Tiêu Đề" className="font-semibold text-lg">Tiêu Đề</label>
                                    <Input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        id="Tiêu Đề"
                                        placeholder="Mô tả ngắn gọn về loại hình bất động sản, diện tích, địa chỉ VD:Bán nhà riêng 50m2 tại Cầu Giấy"
                                        className="text-lg py-3 px-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-red-50"
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="Mô tả" className="font-semibold text-lg">Mô tả</label>
                                    <Input
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        id="Mô tả"
                                        placeholder={`Mô tả chi tiết về:
                                • Loại hình bất động sản
                                • Vị trí
                                • Diện tích, tiện ích
                                • Tình trạng nội thất
                                ...
                                (VD: Khu nhà có vị trí thuận tiện, gần công viên, trường học)`}
                                        className="text-lg py-3 px-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-red-50"
                                    />
                                </div>
                            </div>
                        </InfomationProperty>
                    </div>}
                </div>)}
                {step == 2 && (<div className="w-full mt-3 flex items-center justify-center"><Upload value={uploadedUrls} setValue={setUploadedUrls} /></div>)}
                {step == 3 && (<div className="w-full mt-3 flex items-center justify-center"><ConfigAndPayment packageValue={packageValue} setPackagevalue={setPackagevalue} combo={combo} setCombo={setCombo} date={date} setDate={setDate} time={time} setTime={setTime} /></div>)}
                <div className='w-full mt-5'>
                    <div className='w-1/2 mx-auto flex'>
                        <div className="flex w-full justify-between items-center">
                            {step !== 1 && (<Button
                                variant="outline"
                                className="rounded-full px-6 py-2"
                                onClick={onHandleBack}
                            >
                                Trở về
                            </Button>)}
                            {step === 3 ? <Button
                                variant="outline"
                                className="rounded-full px-6 py-2"
                                type='submit'
                            >
                                Hoàn Tất
                            </Button> : <Button
                                variant="outline"
                                className="rounded-full px-6 py-2"
                                onClick={onHandleNext}
                                disabled={
                                    (isNextDisabled())
                                }
                            >
                                Tiếp theo
                            </Button>}
                        </div>
                    </div>
                </div>
            </form>

        </div >
    )
}

export default PostProperty
