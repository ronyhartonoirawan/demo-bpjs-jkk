"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InputCurrency } from "@/components/ui/input-currency";
import { formatIDR } from "@/lib/utils";
import { useState } from "react";
import { FileUp } from "lucide-react";

interface ItemRawat {
  jenisRawat: string;
  totalAmount: number;
}

interface Diagnosa {
  code: string;
  description: string;
}

export default function Home() {
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

  const [totalKlaim, setTotalKlaim] = useState(0);
  const [listRawat, setListRawat] = useState<ItemRawat[]>([
    { jenisRawat: "Laboratorium", totalAmount: 0 },
    { jenisRawat: "Biaya Pemakaman", totalAmount: 0 },
    { jenisRawat: "Keperawatan", totalAmount: 0 },
    { jenisRawat: "Pelayanan Darah", totalAmount: 0 },
    { jenisRawat: "Jasa Dokter", totalAmount: 0 },
    { jenisRawat: "Biaya Administrasi", totalAmount: 0 },
    { jenisRawat: "Beasiswa Pendidikan", totalAmount: 0 },
    { jenisRawat: "Tindakan Operatif", totalAmount: 0 },
    { jenisRawat: "Rontgen", totalAmount: 0 },
    { jenisRawat: "Biaya Rawat Inap", totalAmount: 0 },
    { jenisRawat: "Santunan Berkala", totalAmount: 0 },
    { jenisRawat: "Alat Kesehatan", totalAmount: 0 },
    { jenisRawat: "Biaya Obat", totalAmount: 0 },
    { jenisRawat: "Tindakan Non Operatif", totalAmount: 0 },
    { jenisRawat: "ICU / ICCU", totalAmount: 0 },
  ]);
  const [selectedListRawat, setSelectedListRawat] = useState<ItemRawat[]>([]);

  const [selectedCodeDiagnosa, setSelectedCodeDiagnosa] = useState<string>("");
  const [selectedDiagnosa, setSelectedDiagnosa] = useState<Diagnosa>();

  const [finalTotalKlaim, setFinalTotalKlaim] = useState(0);
  const [upperBond, setUpperBond] = useState(0);
  const [lowerBond, setLowerBond] = useState(0);

  function handleInputAmount(jenisRawat: string, totalAmount: number) {
    setListRawat((prevListRawat) =>
      prevListRawat.map((item) =>
        item.jenisRawat === jenisRawat ? { ...item, totalAmount } : item
      )
    );

    setTotalKlaim(
      listRawat.reduce(
        (sum, item) =>
          jenisRawat == item.jenisRawat
            ? sum + totalAmount
            : sum + item.totalAmount,
        0
      )
    );
  }

  function handleClickRun() {
    if (!selectedCodeDiagnosa) {
      alert("Masukkan Kode ICD");
    } else if (totalKlaim === 0) {
      alert("Masukkan Jenis Pembayaran");
    } else {
      setSelectedListRawat(listRawat.filter((item) => item.totalAmount > 0));
      setFinalTotalKlaim(totalKlaim);
      setUpperBond(
        Math.random() * (1.5 * totalKlaim - totalKlaim) + totalKlaim
      );
      setLowerBond(
        Math.random() * (0.8 * totalKlaim - totalKlaim) + totalKlaim
      );
      setSelectedDiagnosa(
        listDiagnosa.find((item) => item.code === selectedCodeDiagnosa)
      );
    }
  }

  return (
    <div className="w-full flex justify-center gap-x-4 h-[100vh] items-center ">
      <Card className="w-[30vw] h-[95vh] bg-gradient-to-br from-white to-slate-50">
        <CardContent>
          <div className="w-full border rounded-lg p-4 bg-gradient-to-br from-white to-cyan-50">
            <h1 className="text-xl mb-4 font-semibold">Profil Pasien</h1>
            <div className="w-full grid grid-cols-3 gap-x-2 gap-y-4 ">
              <div>
                <p className="font-semibold  ">Nama:</p>
              </div>
              <div className=" col-span-2">
                John Doe <hr />
              </div>

              <div>
                <p className="font-semibold ">Jenis Kelamin:</p>
              </div>
              <div className=" col-span-2">
                Pria <hr />
              </div>

              <div>
                <p className="font-semibold ">Usia:</p>
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

          <div className="w-full border rounded-lg p-4 mt-2 bg-white items-center grid grid-cols-3 gap-x-2 gap-y-4">
            <h1 className="font-semibold">Kode ICD:</h1>
            <div className="w-full col-span-2">
              <Select
                onValueChange={(value) => {
                  setSelectedCodeDiagnosa(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Kode ICD" />
                </SelectTrigger>
                <SelectContent>
                  {listDiagnosa.map((item) => (
                    <SelectItem key={item.code} value={item.code}>
                      {`${item.code} - ${item.description}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <h1 className="font-semibold">Pembayaran:</h1>
            <ScrollArea className="h-[190px] w-full rounded-md border p-2 col-span-3">
              {listRawat.map((itemRawat, index) => (
                <div
                  className="flex justify-center items-center my-2 text-sm"
                  key={index + 1}
                >
                  <div className="w-60 font-semibold">
                    {itemRawat.jenisRawat}:
                  </div>{" "}
                  <InputCurrency
                    className="text-sm"
                    placeholder="Masukan Jumlah Rupiah"
                    value={itemRawat.totalAmount}
                    onChange={(value) =>
                      handleInputAmount(itemRawat.jenisRawat, value)
                    }
                  />
                </div>
              ))}
            </ScrollArea>

            <h1 className="font-semibold">Total Klaim:</h1>
            <p className="col-span-2">{formatIDR(totalKlaim)}</p>

            <Button
              className="w-full col-span-3"
              onClick={() => handleClickRun()}
            >
              Run
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-[67vw] h-[95vh] bg-gradient-to-b from-white to-slate-50">
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
              <p className="text-2xl font-semibold text-[#0078C0]">
                {" "}
                Klaim Kecelakaan Kerja
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 h-full tracking-wide">
          {finalTotalKlaim > 0 && selectedDiagnosa && selectedListRawat ? (
            <div className="border rounded-lg flex justify-between w-full h-full p-4 overflow-y-auto gap-x-6 bg-white">
              <div className="flex-[0.6]">
                <p className="mb-2">
                  <span className="font-semibold">Kode ICD:</span>{" "}
                  {selectedDiagnosa?.code}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Diagnosa:</span>{" "}
                  {selectedDiagnosa?.description}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Total:</span>{" "}
                  {formatIDR(finalTotalKlaim)}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Upper Bound:</span>{" "}
                  {formatIDR(upperBond)}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Lower Bound:</span>{" "}
                  {formatIDR(lowerBond)}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Outlier:</span>
                  <span> Yes</span>
                </p>
                <p className="font-semibold">Suspicious Score:</p>
                <p className="font-semibold text-4xl text-[#FB2C36]">
                  {"89.5%"}
                </p>
              </div>

              <div className=" border-l"></div>
              <div className="flex-1">
                <p className="mb-2">
                  <span className="font-semibold">Daftar Klaim:</span>
                </p>
                <div className="w-full border rounded-lg mb-2 max-h-[70vh] overflow-y-auto">
                  <Table >
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px] text-center">No</TableHead>
                        <TableHead>Kode Rawat</TableHead>
                        <TableHead className="text-right">
                          Jumlah (Rp.)
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody  >
                      {selectedListRawat.map((item, index) => (
                        <TableRow key={index + 1}>
                          <TableCell className="text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell>{item.jenisRawat}</TableCell>
                          <TableCell className="text-right">
                            {formatIDR(item.totalAmount)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell className="text-right">
                          {formatIDR(
                            selectedListRawat.reduce(
                              (sum, item) => sum + item.totalAmount,
                              0
                            )
                          )}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <FileUp size={128} strokeWidth={0.8} className="text-slate-500" />
              <p>Masukan Data untuk mendapatkan Hasil</p>
            </div>
          )}
        </CardContent>
      </Card>
      {/* text-[#FB2C36] */}
    </div>
  );
}
