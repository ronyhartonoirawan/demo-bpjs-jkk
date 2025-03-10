import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InputCurrency } from "@/components/ui/input-currency";
import { formatIDR } from "@/lib/utils";

export default function Home() {
  const listPembayaran = [
    "Laboratorium",
    "Biaya Pemakaman",
    "Keperawatan",
    "Pelayanan Darah",
    "Jasa Dokter",
    "Biaya Administrasi",
    "Beasiswa Pendidikan",
    "Tindakan Operatif",
    "Rontgen",
    "Biaya Rawat Inap",
    "Santunan Berkala",
    "Alat Kesehatan",
    "Biaya Obat",
    "Tindakan Non Operatif",
    "ICU / ICCU",
  ];
  const listDiagnosa = [
    { code: "S62.6", description: "FRACTURE OF OTHER FINGER" },
    {
      code: "T14.0",
      description: "SUPERFICIAL INJURY OF UNSPECIFIED BODY REGION",
    },
    { code: "S42.0", description: "FRACTURE OF CLAVICLE" },
    {
      code: "S61.9",
      description: "OPEN WOUND OF WRIST AND HAND, PART UNSPECIFIED",
    },
    {
      code: "S61.0",
      description: "OPEN WOUND OF FINGER(S) WITHOUT DAMAGE TO NAIL",
    },
    { code: "Z72.8", description: "OTHER PROBLEMS RELATED TO LIFESTYLE" },
    { code: "T14.1", description: "OPEN WOUND OF UNSPECIFIED BODY REGION" },
    { code: "T14.9", description: "INJURY, UNSPECIFIED" },
    {
      code: "S61.1",
      description: "OPEN WOUND OF FINGER(S) WITH DAMAGE TO NAIL",
    },
    { code: "Z47.9", description: "ORTHOPAEDIC FOLLOW-UP CARE, UNSPECIFIED" },
  ];

  const invoices = [
    {
      invoice: "INV001",
      jenisRawat: "Laboratorium",
      totalAmount: 2500000.0,
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      jenisRawat: "Biaya Pemakaman",
      totalAmount: 1500000.0,
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      jenisRawat: "Keperawatan",
      totalAmount: 3500000.0,
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      jenisRawat: "Beasiswa Pendidikan",
      totalAmount: 4500000.0,
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      jenisRawat: "Tindakan Operatif",
      totalAmount: 5500000,
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      jenisRawat: "Biaya Administrasi",
      totalAmount: 2000000.0,
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      jenisRawat: "Rontgen",
      totalAmount: 3000000.0,
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <div className="w-full flex justify-center gap-x-4 h-[100vh] items-center ">
      <Card className="w-[30vw] h-[95vh]">
        <CardContent>
          <div className="w-full border rounded-lg p-4">
            <h1 className="text-xl mb-4 font-semibold">Profil Pasien</h1>
            <div className="w-full grid grid-cols-3 gap-x-2 gap-y-4 ">
              <div>
                <p className="font-semibold">Nama:</p>
              </div>
              <div className=" col-span-2">
                John Doe <hr />
              </div>

              <div>
                <p className="font-semibold">Jenis Kelamin:</p>
              </div>
              <div className=" col-span-2">
                Pria <hr />
              </div>

              <div>
                <p className="font-semibold">Usia:</p>
              </div>
              <div className=" col-span-2">
                27 Tahun <hr />
              </div>

              <div>
                <p className="font-semibold">Nama Faskes:</p>
              </div>
              <div className=" col-span-2">
                RSUD UNGARAN
                <hr />
              </div>
            </div>
          </div>

          <div className="w-full border rounded-lg p-4 mt-2 items-center grid grid-cols-3 gap-x-2 gap-y-4">
            <h1 className="font-semibold">Kode ICD:</h1>
            <div className="w-full col-span-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Kode ICD" />
                </SelectTrigger>
                <SelectContent>
                  {listDiagnosa.map(({ code, description }) => (
                    <SelectItem key={code} value={code}>
                      {`${code} - ${description}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <h1 className="font-semibold">Pembayaran:</h1>
            <ScrollArea className="h-[200px] w-full rounded-md border p-2 col-span-3">
              {listPembayaran.map((value: string, index) => (
                <div
                  className="flex justify-center items-center my-2 text-sm"
                  key={index + 1}
                >
                  <div className="w-60 font-semibold">{value}:</div>{" "}
                  <InputCurrency
                    className="text-sm"
                    placeholder="Masukan Jumlah Rupiah"
                    defaultValue={0}
                  />
                </div>
              ))}
            </ScrollArea>

            <h1 className="font-semibold">Total Klaim:</h1>
            <p className="col-span-2">{formatIDR(22500000)}</p>

            <Button className="w-full col-span-3">Run</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-[67vw] h-[95vh]">
        <CardHeader>
          <div className="flex gap-x-6">
            <Image
              className="cursor-pointer"
              src={"/Logo_BPJS.png"}
              alt="BPJS Logo"
              width={50}
              height={50}
            />
            <div>
              <p className="text-2xl font-semibold text-[#57BA54]">
                Standar Batasan Pengeluaran
              </p>
              <p className="text-2xl font-semibold text-[#0078C0]"> Klaim Kecelakaan Kerja</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 h-full tracking-wide">
          <div className="border rounded-lg flex h-[78vh] p-4 overflow-y-auto gap-x-6">
            <div>
              <p className="mb-2">
                <span className="font-semibold">Kode ICD:</span> S62.6
              </p>
              <p className="mb-2">
                <span className="font-semibold">Diagnosa:</span> FRACTURE OF
                OTHER FINGER
              </p>
              <p className="mb-2">
                <span className="font-semibold">Daftar Klaim:</span>
              </p>
              <div className="w-[400px] border rounded-lg mb-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">No</TableHead>
                      <TableHead>Kode Rawat</TableHead>
                      <TableHead className="text-right">Jumlah (Rp.)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice, index) => (
                      <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{invoice.jenisRawat}</TableCell>
                        <TableCell className="text-right">
                          {formatIDR(invoice.totalAmount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell className="text-right">
                        {formatIDR(22500000)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>

            <div className="border-l ps-6">
              <p className="mb-2">
                <span className="font-semibold">Outlier:</span>
                <span> Yes</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Upper Bound:</span>{" "}
                {formatIDR(24000000)}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Lower Bound:</span>{" "}
                {formatIDR(20000000)}
              </p>
              <p className="font-semibold">Score:</p>
              <p className="font-semibold text-2xl text-[#00C951]">{"89.5%"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
