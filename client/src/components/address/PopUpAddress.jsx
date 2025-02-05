import React, { memo, useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SelectAddress from './SelectAddress';
import { GetDistrictFromProvinceIdRequest } from '@/api/GetDitrictFromProvinceIdRequest';
import { GetProvinceRequest } from '@/api/GetProvinceRequest';
import { GetWardFromDitrictIdRequest } from '@/api/GetWardFromDistrictRequest';

const PopUpAddress = ({ value, setValue }) => {
  const [variant, setVariant] = useState(false);
  const handleSetvariant = () => {
    setVariant(!variant);
  };
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");

  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");

  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState("");


  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await GetProvinceRequest();
        setProvinces(response?.data || []);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);


  useEffect(() => {
    const fetchDistrictByProvince = async () => {
      if (province) {
        try {
          const response = await GetDistrictFromProvinceIdRequest(province);
          setDistricts(response?.data || []);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      } else {
        setDistricts([]);
      }
    };

    fetchDistrictByProvince();


    setDistrict("");
    setWard("");
    setWards([]);
  }, [province]);


  useEffect(() => {
    const fetchWardByDistrict = async () => {
      if (district) {
        try {
          const response = await GetWardFromDitrictIdRequest(district);
          setWards(response?.data || []);
        } catch (error) {
          console.error("Error fetching wards:", error);
        }
      } else {
        setWards([]);
      }
    };

    fetchWardByDistrict();


    setWard("");
  }, [district]);

  useEffect(() => {
    if (province && district && ward) { // Chỉ cập nhật khi cả 3 giá trị đã được chọn
      const provinceName = provinces?.data.find(el => el.id === province)?.name || "";
      const districtName = districts?.data.find(el => el.id === district)?.name || "";
      const wardName = wards?.data.find(el => el.id === ward)?.name || "";
  
      const fullAddress = `${wardName ? `Xã ${wardName}, ` : ""}${districtName ? `Huyện ${districtName}, ` : ""}${provinceName ? `Tỉnh ${provinceName}` : ""}`;
      setValue(fullAddress);
    }
  }, [province, district, ward]);

  return (
    !variant ? (
      <div className="flex flex-col gap-2 mx-4">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
            <IoIosSearch size={20} />
          </span>
          <Input
            className="pl-12 rounded-full px-10 py-3"
            type="text"
            placeholder="Nhập địa chỉ"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <span className="text-sm">
          Tìm kiếm bằng cách nhập tên quận huyện, phường xã, đường phố hoặc tên dự án
        </span>
        <span className="text-sm font-bold text-gray-500">Hoặc</span>
        <Button variant='outline' className='mb-[50%] drop-shadow' onClick={handleSetvariant}>Chọn địa chỉ</Button>
      </div>
    ) : (
      <div className='p-4 gap-6 w-full flex flex-col'>
        <SelectAddress
          value={province}
          setValue={setProvince}
          items={provinces}
          id='provinces'
          type='Tỉnh/ Thành phố'
        />

        <SelectAddress
          value={district}
          setValue={setDistrict}
          items={districts}
          id='district'
          type='Huyện/ quận'
        />

        <SelectAddress
          value={ward}
          setValue={setWard}
          items={wards}
          id='ward'
          type='Xã/ phường'
        />
        <div>
          <label htmlFor='readOnly'>Địa chỉ hiển thị trên tin đăng</label>
          <Input id='readOnly' readOnly value={`${province && provinces?.data.find(el => el.id === province)?.name ? `Tỉnh ${provinces?.data.find(el => el.id === province)?.name},` : ""} ${district && districts?.data.find(el => el.id === district)?.name ? `Huyện ${districts?.data.find(el => el.id === district)?.name},` : ""} ${ward && wards?.data.find(el => el.id === ward)?.name ? `Xã ${wards?.data.find(el => el.id === ward)?.name}` : ""}
    `}></Input>
        </div>
        <div className='flex justify-end mr-1'><Button variant='outline' className='bg-stone-200'>Xác Nhận</Button></div>
      </div>
    )
  );
};

export default memo(PopUpAddress);
