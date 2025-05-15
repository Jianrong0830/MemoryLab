import { useState, useEffect, useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import emailjs from "emailjs-com";

// 各方案價格（NT$）
const packagePrices: Record<string, number> = {
  "寫真方案": 1000,
  "形象照方案": 2000,
  "加購專業妝容": 500,
  "職涯諮詢": 800,
};

// 各方案訂金（NT$）
const depositPrices: Record<string, number> = {
  "寫真方案": 250,
  "形象照方案": 500,
  "加購專業妝容": 500,
  "職涯諮詢": 500,
};

// 寫死的優惠碼清單
const validPromoCodes = [
  "SAVE100RYAN", 
  "SUCKARES",
  "HANDSOMEXIANGDE",
  "SAVE100SIIIII"
];

const formSchema = z.object({
  name: z.string().min(2, { message: "請輸入您的姓名" }),
  email: z.string().email({ message: "請輸入有效的電子郵件" }),
  phone: z.string().min(8, { message: "請輸入有效的電話號碼" }),
  package: z.array(z.string()).min(1, { message: "請選擇至少一個方案" }),
  photoTimeSlots: z.array(z.string()).default([]),
  imageTimeSlots: z.array(z.string()).default([]),
  consultTimeSlots: z.array(z.string()).default([]),
  ig: z.string().optional(),
  studentInfo: z.string().optional(),
  promoteCode: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const timeOptions = {
  photo: ["上午 (9:00-12:00)", "下午 (13:00-15:00)", "下午 (15:00-18:00)"],
  image: ["上午 (9:00-12:00)", "下午 (13:00-15:00)", "下午 (15:00-18:00)"],
  consult: ["下午 (13:00-15:00)", "下午 (15:00-17:00)"],
};

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [isPromoValid, setIsPromoValid] = useState<boolean | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      package: [],
      photoTimeSlots: [],
      imageTimeSlots: [],
      consultTimeSlots: [],
      ig: "",
      studentInfo: "",
      promoteCode: "",
      message: "",
    },
  });
  const { watch, setValue } = form;

  const selectedPackages = watch("package");
  const igInput = watch("ig");
  const studentInput = watch("studentInfo");
  const promoInput = watch("promoteCode");

  // 優惠碼即時驗證
  useEffect(() => {
    const code = promoInput?.trim();
    setIsPromoValid(code ? validPromoCodes.includes(code) : null);
  }, [promoInput]);

  // 若取消勾選「形象照方案」，自動取消「加購專業妝容」
  useEffect(() => {
    if (
      !selectedPackages.includes("形象照方案 (6/6)") &&
      selectedPackages.includes("加購專業妝容")
    ) {
      setValue(
        "package",
        selectedPackages.filter((pkg) => pkg !== "加購專業妝容"),
        { shouldValidate: true }
      );
    }
  }, [selectedPackages, setValue]);

  // 將「化妝加購」與其他方案分離
  const makeupSelected = selectedPackages.includes("加購專業妝容");
  const nonMakeupPackages = selectedPackages.filter(
    (pkg) => pkg !== "加購專業妝容"
  );

  // 計算總價
  const totalPrice = useMemo(() => {
    // 非化妝方案小計
    const base = nonMakeupPackages.reduce(
      (sum, pkg) => sum + (packagePrices[pkg] || 0),
      0
    );
    // 化妝加購價格（獨立不參與任何折扣）
    const makeupPrice = makeupSelected ? packagePrices["加購專業妝容"] : 0;
    // IG 折扣：全訂單一次 NT$100
    const igDiscount = igInput ? 100 : 0;
    // 學生優惠：非化妝方案，每個方案折 NT$200
    const studentDiscount = studentInput
      ? nonMakeupPackages.length * 200
      : 0;
    // 優惠碼：全訂單一次 NT$100
    const promoDiscount = isPromoValid ? 100 : 0;

    const total =
      base + makeupPrice - igDiscount - studentDiscount - promoDiscount;
    return total > 0 ? total : 0;
  }, [
    nonMakeupPackages,
    makeupSelected,
    igInput,
    studentInput,
    isPromoValid,
  ]);

  // 計算訂金
  const depositTotal = useMemo(() => {
    return selectedPackages.reduce(
      (sum, pkg) => sum + (depositPrices[pkg] || 0),
      0
    );
  }, [selectedPackages]);

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    setFormStatus(null);

    // 最後驗證優惠碼
    if (data.promoteCode && !validPromoCodes.includes(data.promoteCode.trim())) {
      toast({
        title: "優惠碼無效",
        description: "請輸入有效的優惠碼或留空",
      });
      setIsPromoValid(false);
      setIsSubmitting(false);
      return;
    }

    // 時段轉字串
    const photoSlotsText = data.photoTimeSlots.length
      ? data.photoTimeSlots.join(", ")
      : "無";
    const imageSlotsText = data.imageTimeSlots.length
      ? data.imageTimeSlots.join(", ")
      : "無";
    const consultSlotsText = data.consultTimeSlots.length
      ? data.consultTimeSlots.join(", ")
      : "無";

    emailjs
      .send(
        "service_ndck8yt",
        "template_9tvh0j6",
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          package: data.package.join(", "),
          photoTimeSlots: photoSlotsText,
          imageTimeSlots: imageSlotsText,
          consultTimeSlots: consultSlotsText,
          ig: data.ig || "無",
          studentInfo: data.studentInfo || "無",
          promoteCode: data.promoteCode || "無",
          totalPrice: totalPrice.toString(),
          depositTotal: depositTotal.toString(),
          message: data.message || "無留言",
        },
        "WMKgzrqJghOgEHtCa"
      )
      .then(() => {
        setFormStatus("success");
        toast({
          title: "預約成功！",
          description: `總計 NT$${totalPrice}，需付訂金 NT$${depositTotal}。我們將依您選擇的時段安排，並提供匯款方式。`,
        });
        form.reset();
        setIsPromoValid(null);
      })
      .catch(() => {
        setFormStatus("error");
        toast({
          title: "發送失敗",
          description: "抱歉，郵件發送失敗，請稍後再試。",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="contact-form p-6 md:p-8">
      <h3 className="text-2xl font-bold mb-6">預約表單</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* 姓名 */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>姓名</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入您的姓名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 電子郵件 + 電話 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>電子郵件</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>電話</FormLabel>
                  <FormControl>
                    <Input placeholder="09xx-xxx-xxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 方案選擇（含化妝加購條件） */}
          <FormField
            control={form.control}
            name="package"
            render={() => (
              <FormItem>
                <FormLabel>方案選擇（複選）</FormLabel>
                <div className="grid gap-2">
                  {Object.keys(packagePrices).map((pkg) => {
                    // 化妝加購僅在選了形象照方案時顯示
                    if (
                      pkg === "加購專業妝容" &&
                      !selectedPackages.includes("形象照方案 (6/6)")
                    ) {
                      return null;
                    }
                    return (
                      <FormField
                        key={pkg}
                        control={form.control}
                        name="package"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value.includes(pkg)}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  const newValue = checked
                                    ? [...field.value, pkg]
                                    : field.value.filter((v) => v !== pkg);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {pkg}
                              {pkg === "加購專業妝容" ? " (+NT$500)" : ""}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 時段選擇 */}
          {selectedPackages.includes("寫真方案 (6/6)") && (
            <FormField
              control={form.control}
              name="photoTimeSlots"
              render={() => (
                <FormItem>
                  <FormLabel>寫真方案時段</FormLabel>
                  <div className="grid gap-2">
                    {timeOptions.photo.map((slot) => (
                      <FormField
                        key={slot}
                        control={form.control}
                        name="photoTimeSlots"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value.includes(slot)}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  const newValue = checked
                                    ? [...field.value, slot]
                                    : field.value.filter((v) => v !== slot);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{slot}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          )}
          {selectedPackages.includes("形象照方案 (6/6)") && (
            <FormField
              control={form.control}
              name="imageTimeSlots"
              render={() => (
                <FormItem>
                  <FormLabel>形象照方案時段</FormLabel>
                  <div className="grid gap-2">
                    {timeOptions.image.map((slot) => (
                      <FormField
                        key={slot}
                        control={form.control}
                        name="imageTimeSlots"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value.includes(slot)}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  const newValue = checked
                                    ? [...field.value, slot]
                                    : field.value.filter((v) => v !== slot);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{slot}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          )}
          {selectedPackages.includes("職涯諮詢 (6/6)") && (
            <FormField
              control={form.control}
              name="consultTimeSlots"
              render={() => (
                <FormItem>
                  <FormLabel>職涯諮詢時段</FormLabel>
                  <div className="grid gap-2">
                    {timeOptions.consult.map((slot) => (
                      <FormField
                        key={slot}
                        control={form.control}
                        name="consultTimeSlots"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value.includes(slot)}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  const newValue = checked
                                    ? [...field.value, slot]
                                    : field.value.filter((v) => v !== slot);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{slot}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          )}

          {/* IG 折扣欄 */}
          <FormField
            control={form.control}
            name="ig"
            render={({ field }) => (
              <FormItem>
                <FormLabel>(選填) 貼文按讚+追蹤+分享限動 (折抵 NT$100)</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入您的 Instagram 帳號以供確認" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* 學生優惠 */}
          <FormField
            control={form.control}
            name="studentInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>(選填) 學生優惠（每方案折抵 NT$200）</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入您的學校、學號以供確認" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* 優惠碼 */}
          <FormField
            control={form.control}
            name="promoteCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>優惠碼</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入優惠碼" {...field} />
                </FormControl>
                {isPromoValid === true && (
                  <p className="text-green-600 text-sm mt-1">✅ 優惠碼正確，可折抵 NT$100！</p>
                )}
                {isPromoValid === false && (
                  <p className="text-red-600 text-sm mt-1">❌ 優惠碼無效</p>
                )}
              </FormItem>
            )}
          />

          {/* 留言 */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>留言（選填）</FormLabel>
                <FormControl>
                  <Textarea placeholder="有任何問題或需求..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* 顯示價格 */}
          <div className="text-right space-y-1">
            <div className="text-2xl font-bold">總計：NT${totalPrice}</div>
            <div className="text-lg text-gray-600">需付訂金：NT${depositTotal}</div>
            <div className="text-sm text-gray-500">
              (確認有空位後團隊會再提供付款方式)
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "提交中..." : "送出預約"}
          </Button>
        </form>
      </Form>

      {/* 回饋訊息 */}
      {formStatus && (
        <div
          className={`mt-4 p-4 text-center ${
            formStatus === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {formStatus === "success" ? (
            <>
              <p>預約成功！</p>
              <p className="text-sm mt-2">
                總計 NT${totalPrice}，需付訂金 NT${depositTotal}。我們將儘快與您聯繫。
              </p>
            </>
          ) : (
            "發送失敗，請稍後再試。"
          )}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
