import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BranchCreatePage.css";

export default function BranchCreatePage() {
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

  const next = () => {
    if (step === 1 && !branchName.trim()) return alert("กรุณากรอกชื่อสาขา");
    if (step < 3) setStep((s) => s + 1);
    else nav("/"); // จบขั้นตอน -> กลับหน้าจัดการสาขา (จะเปลี่ยนเป็นบันทึกจริงภายหลังได้)
  };
  const back = () => (step > 1 ? setStep((s) => s - 1) : nav(-1));

  return (
    <section className="create">
      {/* Header bar */}
      <div className="header-bar">
        {/* หัวเรื่อง */}
        <h1 className="create-title">เพิ่มสาขาใหม่</h1>
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
              onChange={(e) => setBranchName(e.target.value)}
            />
          </Field>

          <Field label="รหัสสาขา:">
            <div className="input input--withIcon">
              <span className="input-value">{branchCode}</span>
              <span className="input-icon" aria-hidden="true">
                {/* lock */}
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
              <select value={manager} onChange={(e) => setManager(e.target.value)}>
                {managers.map((m) => (
                  <option key={m} value={m}>
                    {m}
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

          <Field label="พนักงานขาย:">
            <div className="select">
              <select value={sales} onChange={(e) => setSales(e.target.value)}>
                {salesList.map((s) => (
                  <option key={s} value={s}>
                    {s}
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
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h2 className="card-title">ที่อยู่สาขา :</h2>
          <Field label="ที่อยู่">
            <input className="input" placeholder="เลขที่, ถนน, ตำบล/แขวง" />
          </Field>
          <div className="grid2">
            <Field label="อำเภอ/เขต">
              <input className="input" />
            </Field>
            <Field label="จังหวัด">
              <input className="input" />
            </Field>
          </div>
          <div className="grid2">
            <Field label="รหัสไปรษณีย์">
              <input className="input" />
            </Field>
            <Field label="โทรศัพท์">
              <input className="input" />
            </Field>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h2 className="card-title">ตรวจสอบ & ยืนยัน :</h2>
          <ul className="summary">
            <li><strong>ชื่อสาขา:</strong> {branchName}</li>
            <li><strong>รหัสสาขา:</strong> {branchCode}</li>
            <li><strong>ผู้ดูแล:</strong> {manager}</li>
            <li><strong>พนักงานขาย:</strong> {sales}</li>
          </ul>
          <p className="muted">กด “ถัดไป” เพื่อบันทึก (ตัวอย่างจะพากลับหน้า “จัดการสาขา”).</p>
        </div>
      )}

      {/* แถบปุ่มล่าง */}
      <div className="cta">
        <button className="btn-primary" onClick={next}>
          {step < 3 ? "ถัดไป" : "บันทึก"}
        </button>
        <button className="btn-link" onClick={back}>ย้อนกลับ</button>
      </div>
    </section>
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
    <ol className="stepper" aria-label={`ขั้นตอน ${current} จาก ${total}`}>
      {Array.from({ length: total }).map((_, i) => {
        const n = i + 1;
        const active = n <= current;
        return (
          <li key={n} className={`step ${active ? "is-active" : ""}`}>
            <span className="dot">{n}</span>
            {n < total && <span className="bar" />}
          </li>
        );
      })}
    </ol>
  );
}
