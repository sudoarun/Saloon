import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import BreadCrumb from "../BreadCrumbs/Breadcrumb";
import "react-day-picker/dist/style.css";
import { useMediaQuery } from "@uidotdev/usehooks";
import List from "./List";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { useEffect } from "react";
import Loader from "../Loader/loader";

const BookShop = ({ services, shopDetails }) => {
  const [selected, setSelected] = useState(Date);
  const isSmallDevice = useMediaQuery("(max-width : 748px)");
  const isMediumDevice = useMediaQuery("(min-width : 769px)");
  let today = new Date();
  let year = today.getFullYear();
  const { id, parent } = useParams();
  const [service, setService] = useState("");
  // console.log("parent :", parent, "id :", id);
  const getService = async () => {
    // const data = await getDocs(
    //   collection(db, "ProfessionalDB", `${parent}`, "Services", `${id}`)
    // ).catch((err) => console.log(err));
    // const get = data.docs.map((res) => ({
    //   ...res.data(),
    //   id: res.id,
    // }));
    // console.log(get);
    const docRef = doc(db, "ProfessionalDB", `${parent}`, "Services", `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setService(docSnap.data());
      console.log(service);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <div className="container">
        <BreadCrumb //BreadCrumbs component
          prevPage={"Shop"}
          link={`/shop/${parent}`}
          activePage={"Booking"}
          text="white"
        />
      </div>
      <h4 className="text-white text-center ">
        <span className="border pe-4 py-2">
          <span className="py-2 ps-4 bg-white text-black">Book the</span> Shop
        </span>
      </h4>

      <div className="container">
        <div className="row mt-5  align-items-center">
          <div className="col-12 col-sm-6 d-flex">
            <div className="text-white">
              <span className="d-block">Shop Name</span>
              <span className="d-block">Service Name</span>
              <span className="d-block">Service Price</span>
              <span className="d-block">Service Time</span>
            </div>
            {services === "" ? (
              <Loader />
            ) : (
              <div className="text-white">
                <span className="d-block">
                  <span className="mx-2">:</span>
                  Shop Name
                </span>
                <span className="d-block">
                  <span className="mx-2">:</span>
                  {service.ServiceName}
                </span>
                <span className="d-block">
                  <span className="mx-2">:</span>
                  {service.Price}
                </span>
                <span className="d-block">
                  <span className="mx-2">:</span>
                  {service.Description}
                </span>
              </div>
            )}
          </div>
          <div className="col-12 col-sm-6 mt-3">
            <div className="text-white ">
              <div
                className="d-flex border justify-content-center p-2 text-center"
                style={{ height: "400px" }}
              >
                <div>
                  <h6 className="fw-bold">Pick Your Date</h6>
                  <div className="">
                    <DayPicker
                      mode="single"
                      required
                      selected={selected}
                      onSelect={setSelected}
                      footer={selected.toString().substring(0, 15)}
                      fromYear={year}
                      fromMonth={today}
                      showOutsideDays
                      fixedWeeks
                      modifiersClassNames={{
                        today: "my-today",
                      }}
                    />
                  </div>
                </div>
                {/* Menu for Desktop mode */}
                {isMediumDevice ? (
                  <div className="h-100 ">
                    <h6 className="fw-bold">Pick Your Time</h6>
                    <div className="text-white scheduleTime h-100 mt-5">
                      <div className="overflow-auto h-75">
                        <List />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* Menu for mobile mode */}
              {isSmallDevice ? (
                <div className="container mt-4">
                  <h6 className="fw-bold text-center mb-3">Pick Your Time</h6>
                  <div className="w-100 overflow-auto">
                    <List name="d-flex" />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Payment Section */}
      <div className="mt-5 bg-white container-fluid">
        <h4 className=" text-center pt-4">
          <span className="border ps-3 py-3 fw-bold">
            Payment
            <span className="text-white fw-normal bg-black ms-1 ps-1 py-3 pe-3">
              Section
            </span>
          </span>
        </h4>
        <div className="row mt-5 align-items-center pb-3">
          <div className="col-5 col-sm-4 text-center">
            <div className="w-100">
              <img
                src="https://img.freepik.com/premium-vector/hand-drawn-barbershop-illustration_9829-82.jpg?size=626&ext=jpg&ga=GA1.2.1543915203.1685795707&semt=ais"
                alt=""
                className="w-100"
              />
            </div>
          </div>
          <div className="col-7 col-sm-4 d-flex justify-content-center">
            <div className="w-100">
              <h6 className="fw-bold">Additional Services</h6>
              <div className="d-block pt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Shampoo (80rs)
                </label>
              </div>
              <div className="d-block">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Head Massage (50rs)
                </label>
              </div>
              <div className="d-block">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Face Mask (80rs)
                </label>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 mt-5 d-flex justify-content-center me-0 overflow-hidden">
            <div className="w-75">
              <h6 className="fw-bold text-center">Services Details</h6>
              <div className="pt-2">
                <div className="d-flex justify-content-between">
                  <span>Total Services :</span>
                  <span>{service.ServiceName}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Book Time :</span>
                  <span>23/05/23 at 12pm</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Total Bill :</span>
                  <span className="fw-bold">3000rs</span>
                </div>
              </div>
              <button className="px-5 py-2 bg-black text-white border-0 mt-3">
                Paynow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookShop;
