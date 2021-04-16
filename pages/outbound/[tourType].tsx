
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Icon,
  Input,
  Row,
  Select,
  Spin,
  Switch,
  Affix,
  Statistic,
} from "antd";
import { Cart, TcResponse, TravelCloudClient } from "travelcloud-antd";
import { useRouter } from 'next/router'
import TableTourDepartureDate from "../../components/partials/outbound/TableTourDepartureDate";
import TableTourMaster from "../../components/partials/outbound/TableTourMaster";
import FormRoomDetail from "../../components/partials/outbound/FormRoomDetail";
import "./outbound.style.less";


const config = {
  tcUser: 'edge2',
  defaultTitle: '',
  companyName: ''
}

const OutBoundPage = ({ tourType } : {tourType: string}) => {
  const router = useRouter();
  const [priceCheckRes, setPriceCheckRes] = useState<TcResponse<any>>({})
  const [tourReq, setTourReq] = useState<TcResponse<any>>({loading: true})
  const [tourSelected, setTourSelected] = useState(null);
  const client = new TravelCloudClient(config)

  useEffect(() => {
    async function asyncUseEffect() {
      if (tourType != null && tourType.match(/^[A-Z]+$/) != null && tourType.length > 3 && tourType.length < 10) {
        var req = await client.outboundGet('tourmasters/searchtourtype', {q: tourType})
        setTourReq(req)
      }
    }
    asyncUseEffect()
  }, [tourType])

  const cart = process.browser === false ? null : new Cart({
    client,
    onOrderChange: () => { },
    onCustomerChange: () => { },
  })

  const tour = tourReq?.result?.[0];

  const handleSubmitPriceCheck = async (values) => {
    setPriceCheckRes({ loading: true });
    const priceCheckRes = await client.outboundPost(
      "tourbookings/pricecheck",
      {},
      {
        tourCode: tourSelected.tourCode,
        landOnly: values.landOnly,
        roomList: values.roomList,
      }
    );
    setPriceCheckRes(priceCheckRes);
  };

  const handleClickBtnCheckout = async () => {
    cart.reset().addOutboundTour(
      {
        tourMaster: tourSelected,
        priceCheck: priceCheckRes.result,
      },
      {
        tourCode: tourSelected.tourCode,
        landOnly: priceCheckRes.result.landOnly,
        roomList: [priceCheckRes.result.roomList],
      }
    );
    router.push("/checkout");
  }
  if (tourReq.loading) {
    return (
        <div className="page-outbound" style={{ textAlign: "center" }}>
          <Spin size="large" style={{ margin: "auto" }} />
        </div>
    );
  }

  return (
    <Row className="page-outbound" type="flex">
      <Col span={18} className="tour-container">
        {tour != null && (
          <>
            <h1 className="title">{tour.briefDescription}</h1>
            <TableTourDepartureDate
              tourMasters={tour?.tourMasters}
              tourSelected={tourSelected}
              setTourSelected={setTourSelected}
            />
          </>
        )}
        {tourSelected && (
          <>
            <TableTourMaster tourMaster={tourSelected} />
            <FormRoomDetail
              onSubmitFormRoomDetail={handleSubmitPriceCheck}
              submitRes={priceCheckRes}
            />
          </>
        )}
      </Col>
      <Col span={6} className="price-container">
        <div>
          <h2 className="card-title">Price Check</h2>
          {priceCheckRes.loading && (
            <div style={{ textAlign: "center" }}>
              <Spin size="large" style={{ margin: "auto" }} />
            </div>
          )}
          {priceCheckRes.result != null && (
            <>
              <Statistic title="Total" value={priceCheckRes.result.totalFare} />
              <div style={{ textAlign: "right" }}>
                <Button onClick={handleClickBtnCheckout}>Checkout</Button>
              </div>
            </>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default OutBoundPage;

export async function getStaticProps(context) {
  var tourType = context.params?.tourType
  return {
    props: { tourType }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
