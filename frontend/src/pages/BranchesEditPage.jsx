import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BranchesEditPage.css";
import Swal from "sweetalert2";


export default function BranchEditPage() {
  const nav = useNavigate();

  // step
  const [step, setStep] = useState(1);

  // form state (step 1)
  const [branchName, setBranchName] = useState("Shironeko Cafe");
  const [branchCode] = useState("MPX-0013"); // ล็อกไว้
  const [manager, setManager] = useState("นายออเทอร์ โวท์");
  const [sales, setSales] = useState("นายฮาลั่น มิวอิ้ง");

  const managers = ["นายออเทอร์ โวท์", "น.ส.จิระภา มณี", "นายทศพล ศรีทอง"];
  const salesList = ["นายฮาลั่น มิวอิ้ง", "น.ส.อุบล พิชิต", "นายพชร สุขดี"];

  // เก็บค่าจังหวัดที่ผู้ใช้เลือก
  const [province, setProvince] = useState("");

  // เก็บรายการจังหวัดทั้งหมดจาก API
  const [provinces, setProvinces] = useState([]);

  // State ของอำเภอ 
  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);

  // State ของตำบล 
  const [subdistrict, setSubdistrict] = useState("");
  const [subdistricts, setSubdistricts] = useState([]);

  const [text, setText] = useState("");
  const [showButton, setShowButton] = useState(false);

  //จังหวัด
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
      );
      const data = await res.json();
      setProvinces(
        data.map((p) => ({ id: p.id, name_th: p.name_th }))
      );
    })();
  }, []);

  // อำเภอ
  useEffect(() => {
    if (!province) {
      setDistricts([]);
      setDistrict("");
      return;
    }
    (async () => {
      const res = await fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json"
      );
      const data = await res.json();
      const filtered = data
        .filter((a) => a.province_id === province)   // ✅ ใช้ province_id
        .map((a) => ({ id: a.id, name_th: a.name_th }));
      setDistricts(filtered);
      setDistrict("");
    })();
  }, [province]);

  // ตำบล
  useEffect(() => {
    if (!district) {
      setSubdistricts([]);
      setSubdistrict("");
      return;
    }
    (async () => {
      const res = await fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json"
      );
      const data = await res.json();
      const filtered = data
        .filter((t) => t.amphure_id === district)  // ✅ ใช้ amphure_id
        .map((t) => ({ id: t.id, name_th: t.name_th }));
      setSubdistricts(filtered);
      setSubdistrict("");
    })();
  }, [district]);

  //การเลื่อนหน้าจอ
  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom =
        window.innerHeight + window.scrollY; // ขอบล่างของ viewport
      const pageHeight = document.documentElement.scrollHeight; // ความสูงทั้งหมดของหน้า

      if (scrollBottom + 100 >= pageHeight) { // เลื่อนใกล้สุดท้าย 100px
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const next = () => {
    if (step === 1 && !branchName.trim()) {
      return Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกชื่อสาขา',
        confirmButtonText: 'ตกลง'
      });
    }

    if (step < 3) {
      setStep((s) => s + 1);
    } else {
      // step === 3 -> Confirm ก่อนบันทึก
      Swal.fire({
        title: 'ยืนยันการแก้ไขข้อมูล',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F5A524',
        cancelButtonColor: 'rgba(146, 146, 146, 1)',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          // ทำการบันทึกข้อมูลจริง (เช่น API)
          Swal.fire({
            title: 'การแก้ไขสาขาเรียบร้อย',
            icon: 'success',
            iconColor: '#F5A524',
            confirmButtonText: 'รับทราบ',
            confirmButtonColor: '#F5A524'
          });

          // กลับหน้าหลัก
          nav("/branches");
        }
      });
    }
  };

  const back = () => (step > 1 ? setStep((s) => s - 1) : nav(-1));

  return (
    <section className="edit">
      {/* Header bar */}
      <div className="header-bar">
        {/* หัวเรื่อง */}
        <h1 className="edit-title">แก้ไขสาขา</h1>
        {/* ปุ่มปิด (ขวาบน) */}
        <button className="close-btn" aria-label="ปิด" onClick={() => nav("/branches")}>
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>


      {/* ตัวนับขั้นตอน */}
      <Stepper current={step} total={3} />

      {/* ฟอร์ม (แสดงตามขั้น) */}
      {step === 1 && (
        <div className="card">
          <h2 className="card-title">รายละเอียดของสาขา :</h2>

          <Field label="ชื่อของสาขา:">
            <input
              className="input"
              type="text"
              placeholder="กรอกชื่อสาขา"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}    /* บันทึกเวลา อัปเดตที่ branchName */
            />
          </Field>

          <Field label="รหัสสาขา:">
            <div className="input input--withIcon">
              <span className="input-value">{branchCode}</span>
              <span className="input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    d="M7 11h10v8H7v-8zm2 0V8a3 3 0 016 0v3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Field>

          <Field label="ผู้ดูแล:">
            <div className="select">
              <select
                value={manager}
                onChange={(e) => setManager(e.target.value)}>
                <option value="" disabled hidden>เลือกผู้ดูแล</option>
                {managers.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}

              </select>
              <span className="chev" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </Field>

          <Field label="พนักงานขาย:">
            <div className="select">
              <select value={sales} onChange={(e) => setSales(e.target.value)}>
                <option value="" disabled hidden>เลือกพนักงานขาย</option>
                {salesList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <span className="chev" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </Field>

          <Field label="***หมายเหตุ***">
            <div className="text-box">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ width: "357px", height: "138px" }}
                className="border border-gray-400 rounded-lg p-2 w-full"
                placeholder="กรุณาใส่เหตุผล..."
              />
            </div>
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h2 className="card-title">สถานที่ตั้ง:</h2>
          <Field label="รหัสไปรษณีย์:">
            <input className="input" placeholder="กรอกรหัสไปรษณีย์" />
          </Field>
          <div className="grid2">
            <Field label="ตำแหน่งละติจูด">
              <input className="input" />
            </Field>
            <Field label="ตำแหน่งลองจิจูด">
              <input className="input" />
            </Field>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h2 className="card-title">สถานที่ตั้ง(ต่อ):</h2>

          <Field label="ที่อยู่:">
            <input className="input" />
          </Field>

          <Field label="รหัสไปรษณีย์:">
            <input className="input" />
          </Field>

          <Field label="จังหวัด:">
            <div className="select">
              <select
                value={province}
                onChange={(e) => setProvince(Number(e.target.value))}
              >
                <option value="">เลือกจังหวัด</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name_th}   {/*ใช้ชื่อจังหวัด */}
                  </option>
                ))}
              </select>
              <span className="chev" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </Field>

          <Field label="อำเภอ:">
            <div className="select">
              <select
                value={district}
                onChange={(e) => setDistrict(Number(e.target.value))}
                disabled={!province}
              >
                <option value="">เลือกอำเภอ</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name_th}   {/*ใช้ชื่ออำเภอ */}
                  </option>
                ))}
              </select>
              <span className="chev" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </Field>

          <Field label="ตำบล:">
            <div className="select">
              <select
                value={subdistrict}
                onChange={(e) => setSubdistrict(Number(e.target.value))}
                disabled={!district}
              >
                <option value="">เลือกตำบล</option>
                {subdistricts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name_th}   {/*ใช้ชื่อตำบล */}
                  </option>
                ))}
              </select>
              <span className="chev" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </Field>

          <div className="grid2">
            <Field label="ตำแหน่งละติจูด:">
              <input className="input" />
            </Field>
            <Field label="ตำแหน่งลองจิจูด:">
              <input className="input" />
            </Field>
          </div>
        </div>
      )}

      {/* แถบปุ่มล่าง */}
      {showButton && (
        <div className="cta" style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translatex(-50%)",
        }}>
          <button className="btn-primary" onClick={next}>
            {step < 3 ? "ถัดไป" : "ยืนยันการแก้ไข"}
          </button>
          <button className="btn-link" onClick={back}>
            ย้อนกลับ
          </button>
        </div>
      )}
    </section >
  );
}

/* ---------- Helpers ---------- */
function Field({ label, children }) {
  return (
    <label className="field">
      <div className="field-label">{label}</div>
      {children}
    </label>
  );
}

function Stepper({ current = 1, total = 3 }) {
  return (
    <ol className="step-edit" aria-label={`ขั้นตอน ${current} จาก ${total}`}>
      {Array.from({ length: total }).map((_, i) => {
        const n = i + 1;
        const active = n == current;
        return (
          <li key={n} className={`step-edit ${active ? "is-active" : ""}`}>
            <span className="dot">{n}</span>
            {n < total && <span className="bar" />}
          </li>
        );
      })}
    </ol>
  );
}