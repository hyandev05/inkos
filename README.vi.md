<p align="center">
  <img src="assets/logo.svg" width="120" height="120" alt="InkOS Logo">
  <img src="assets/inkos-text.svg" width="240" height="65" alt="InkOS">
</p>

<h1 align="center">Story Creation AI Agent<br><sub>Hệ thống tác nhân AI sáng tác cho tiểu thuyết dài/ngắn, kịch bản, phim-tương-tác, nội dung IP và dịch thuật đa ngôn ngữ</sub></h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@actalk/inkos"><img src="https://img.shields.io/npm/v/@actalk/inkos.svg?color=cb3837&logo=npm" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="License: AGPL-3.0"></a>
  <a href="https://github.com/Narcooo/inkos/stargazers"><img src="https://img.shields.io/github/stars/Narcooo/inkos?style=flat&logo=github&color=yellow" alt="GitHub stars"></a>
  <a href="https://www.npmjs.com/package/@actalk/inkos"><img src="https://img.shields.io/npm/dm/@actalk/inkos?color=cb3837&logo=npm&label=downloads" alt="npm downloads"></a>
  <a href="https://clawhub.ai/narcooo/inkos"><img src="https://img.shields.io/badge/🦞%20ClawHub-Skill-FF6B35?labelColor=1a1a1a" alt="ClawHub Skill"></a>
</p>

<p align="center">
  <a href="README.md">中文</a> | <a href="README.en.md">English</a> | <a href="README.ja.md">日本語</a> | Tiếng Việt
</p>

---

InkOS là một hệ thống **tác nhân AI (Agent)** dành riêng cho sáng tác truyện và dịch thuật đa ngôn ngữ: tiểu thuyết dài kỳ, truyện ngắn độc lập, kịch bản, phân cảnh, fanfic, ngoại truyện, phỏng tác phong cách, viết tiếp, phim tương tác, thế giới mở và dịch văn bản dài — tất cả đều khởi đầu từ cùng một workbench. Studio Chat, CLI và TUI chia sẻ chung một action surface để trò chuyện, xác nhận hành động, sinh tác phẩm, biên tập lâu dài và giao nộp đa ngôn ngữ.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://kimi-file.moonshot.cn/prod-chat-kimi/kfs/4/1/2026-06-05/1d8h69mt3v89kkekg24gg">
    <img alt="Kimi Open Source Friends" width="760" src="https://kimi-file.moonshot.cn/prod-chat-kimi/kfs/4/1/2026-06-05/1d8h69fudcmosb3pipls0">
  </picture>
</p>

<p align="center">
  <a href="https://platform.moonshot.ai/"><img src="https://gcdn.moonshot.cn/growth-cdn/sponsor/kimi-en.png" width="900" alt="Kimi tài trợ InkOS"></a>
</p>

Cảm ơn **Kimi** đã tài trợ dự án này! Kimi K2.7 là mô hình tác nhân mã nguồn mở của Moonshot AI. Kết hợp với InkOS, Kimi có thể tham gia lên kế hoạch, viết, duyệt và sửa tiểu thuyết dài/ngắn, kịch bản, phim tương tác và nội dung đa ngôn ngữ; còn InkOS liên tục quản lý nhân vật, bối cảnh, tuyến phục bút và trạng thái câu chuyện để sáng tác dài kỳ được mạch lạc và dễ kiểm soát.

InkOS Studio đã hỗ trợ Moonshot (Kimi). Lấy API Key từ Kimi Open Platform ([中文站](https://platform.moonshot.cn/) | [Global](https://platform.moonshot.ai/)) là bắt đầu sáng tác được ngay.

> 💡 **Một key cho nhiều mô hình hàng đầu thế giới** — kết hợp InkOS với [**kkaiapi**](https://en.kkaiapi.com/): cổng OpenAI-compatible cho Claude, GPT, Gemini, DeepSeek, Kimi, Qwen, GLM và cả mô hình sinh ảnh. Thêm nó như một custom service với base URL `https://api.kkaiapi.com/v1`, rồi đổi mô hình ngay trong Studio mà không cần quản lý nhiều tài khoản provider.

## v1.7 — Sáng tác đa ngôn ngữ, suy diễn cốt truyện và cộng tác không gián đoạn

InkOS 1.7 đưa giao nộp đa ngôn ngữ, suy diễn truyện dài và cộng tác liên tục vào cùng một workbench tác nhân. Bạn có thể dịch toàn bộ tác phẩm, so sánh nhiều tương lai phi-chính-sử, tiếp tục trò chuyện trong khi sáng tác chạy nền, hoặc nhờ Chat đọc tài liệu tham khảo, nhập bản thảo có sẵn, điều chỉnh prompt, sửa chương và khôi phục trạng thái sáng tác an toàn.

- **Cấu hình mô hình** — Studio tích hợp cấu hình đa service, định tuyến mô hình và cấu hình dịch vụ bìa; hỗ trợ cổng tổng hợp mô hình toàn cầu như [kkaiapi](https://en.kkaiapi.com/) / OpenRouter, cũng như custom endpoint OpenAI-compatible.
- **Suy diễn đa tuyến cốt truyện**: Studio Chat và CLI có thể tạo, kiểm tra và chọn 2–5 tương lai cô lập từ chính sử hiện tại, so sánh ngang nhịp chương, quyết định nhân vật, thay đổi dự kiến, rủi ro và mức khớp ý đồ tác giả. Chọn một nhánh chỉ lưu kế hoạch, không sửa đổi trước phần chính văn, thiết lập hay trạng thái câu chuyện.
- **Workbench dịch hoàn chỉnh**: nhập EPUB, PDF dạng text, TXT và Markdown; dịch theo chương và đoạn ngữ nghĩa; duy trì thuật ngữ, sinh báo cáo đối chiếu, xuất TXT, Markdown hoặc EPUB. Studio, Chat và `inkos translate init / run / export` dùng chung một năng lực.
- **Sáng tác đa ngôn ngữ bản địa**: truyện ngắn, kịch bản, phân cảnh và phim tương tác có đủ luồng sáng tác tiếng Anh; giao diện Studio và cơ chế fallback ngôn ngữ của CLI cũng được đồng bộ — không chỉ thêm một menu dịch.
- **Đính kèm, thư viện tư liệu và prompt có thể chỉnh**: Chat đọc được text, Markdown và ảnh; lưu trữ và truy xuất tài liệu ngoài kèm dấu vết nguồn; xem và chỉnh prompt của truyện dài, Play và phim tương tác trong Studio.
- **Tác phẩm có sẵn đi thẳng vào hệ thống**: Chat nhập chương thật từ file, thư mục hoặc đính kèm; tự động dựng ngược thiết lập và phát lại trạng thái chương — thay vì chỉ coi bản thảo là ngữ cảnh tạm.
- **Vừa viết vừa chat**: nhiệm vụ sản xuất (chương...) chạy nền trong khi vẫn trò chuyện; có thể hủy nhiệm vụ, thử lại tin nhắn lỗi; sau khi làm mới/khởi động lại vẫn khôi phục đúng tiến độ, trạng thái cuối và thẻ công cụ đầy đủ.
- **Duyệt, sửa và viết liên tục có kiểm soát**: ba mức sửa `strict` / `lenient` / `always`, override cấp dự án và cấp sách, tự động hoặc thủ công duyệt từng cuốn. CLI thêm `inkos auto` và thông báo hoàn thành/thất bại; bản sửa bị từ chối hiển thị số liệu trước/sau và vấn đề còn lại.
- **Dữ liệu sáng tác và đồng thời an toàn hơn**: backup/khôi phục cả cuốn, xóa chương mới nhất kèm rollback trạng thái, cập nhật đồng bộ số từ index sau chỉnh sửa cục bộ; khóa ghi kẹt có thể phục hồi, ghi trùng trả về rõ ràng `BOOK_BUSY`, trạng thái hoàn thành chỉ đến từ kết quả công cụ và file thật.
- **Mô hình, cài đặt và đa nền tảng ổn định hơn**: tích hợp MiniMax mặc định tách nội dung suy nghĩ; OpenRouter, kkaiapi... không còn bị danh sách mô hình tĩnh chặn nhầm; gói npm không còn rò rỉ `workspace:*` gây lỗi nâng cấp; chi tiết thao tác, thông báo và đường dẫn dự án nhất quán hơn trên các nền tảng.

## v1.6.0 — Phim tương tác và hệ thống Skill

InkOS 1.6.0 mở rộng thế giới mở thành phim tương tác, kịch bản và workbench phân cảnh, đồng thời giới thiệu hệ thống **Skill** có thể cắm thêm: năng lực chuyên môn có thể được Chat Agent gọi theo ý đồ người dùng, hoặc do người dùng ép buộc bằng `@skill-id`. Viết, tương tác, nghiên cứu và xuất bản tiếp tục chia sẻ một action surface; hành động nặng được xác nhận trước khi thực thi, sản phẩm có thể xem và xuất ngay trong Studio.

- **Phim tương tác**: cốt truyện phân nhánh, biến/cờ, quan hệ nhân vật, kết thúc, ảnh node và xuất gói dự án tương tác — phù hợp làm phim tương tác, game tương tác và kịch bản đa kết thúc.
- **Agent Skills**: tương thích trực tiếp gói năng lực chuẩn `SKILL.md`; Chat Agent gọi theo ý đồ người dùng, người dùng cũng có thể ép bằng `@skill-id`. Skill chỉ cung cấp hướng dẫn chuyên môn và tài liệu tham khảo tĩnh, không gắn với trường riêng của InkOS, gói prompt hay bộ lập kế hoạch ngữ cảnh.
- **Nghiên cứu trực tuyến**: `research_web` phục vụ thế giới quan, nghề nghiệp, thời đại, thị trường và kiểm chứng sự kiện, sinh báo cáo Markdown kèm nguồn, lịch sử truy vấn và độ tin cậy.
- **Ổn định cộng tác biên tập**: chỉnh sửa chương cục bộ, khôi phục index chương, truyền bookId khi chuyển model nhiều kênh đều có bảo vệ hồi quy.

<p align="center">
  <img src="assets/interactive-film-e2e.png" width="900" alt="Ảnh thực tế cây cốt truyện phim tương tác InkOS">
</p>

<p align="center">
  <img src="assets/inkos-short-demo-cover.png" width="210" alt="Bìa truyện ngắn InkOS Short">
  <img src="assets/play-openworld-warcraft.png" width="210" alt="Thế giới mở fantasy InkOS Play">
  <img src="assets/play-openworld-romance.png" width="210" alt="Tương tác tình cảm InkOS Play">
  <img src="assets/play-openworld-detective.png" width="210" alt="Tương tác trinh thám InkOS Play">
</p>

**Tiểu thuyết dài kỳ** — tạo sách từ bản brief, sinh thế giới quan, nhân vật, dàn chương, ý đồ chương, rồi đẩy theo chuỗi “viết → duyệt → sửa cần thiết → kết toán trạng thái”. Ngữ cảnh được phân tầng protected / compressible để sách càng dài càng dễ điều khiển.

**Suy diễn đa tuyến cốt truyện** — trước khi viết chương kế, sinh 2–5 nhánh tương lai cô lập từ chính sử hiện tại và so sánh ngang trong Studio Chat: nhịp chương, quyết định nhân vật, thay đổi dự kiến, rủi ro và độ khớp ý đồ tác giả. Chọn nhánh chỉ lưu `selected-branch-plan.md`, không đụng vào chính văn, outline hay trạng thái chính sử; khi chính sử thay đổi, suy diễn cũ bị đánh dấu lỗi thời.

**InkOS Short** — Studio Chat và CLI sinh trực tiếp truyện ngắn hoàn chỉnh: toàn văn, bản ghi outline, bản ghi duyệt, giới thiệu/điểm bán, cover prompt và (nếu cấu hình dịch vụ bìa) ảnh bìa.

**InkOS Play** — thế giới mở và tương tác phân nhánh. Dùng ngôn ngữ tự nhiên để quy định hợp đồng thế giới: thời gian trôi, nhân vật agent, vật phẩm/chứng cứ/quan hệ, trạng thái cảnh, quy tắc hình ảnh, lựa chọn dẫn hướng, hành động tự do và sinh ảnh tùy chọn.

**Phim tương tác** — biến ý tưởng, kịch bản hay tham khảo văn bản thành cảnh phân nhánh, biến, kết thúc, image prompt, ảnh node và gói dự án có thể xuất.

**Studio Chat** — mặt trò chuyện bền vững: trả lời câu hỏi, đề xuất hành động, tạo sách, khởi chạy Short/Play, sinh bìa, biên tập artifact văn bản — và không tuyên bố thành công trước khi kết quả công cụ có thật.

**Agent Skills và nghiên cứu** — thêm gói chuẩn `SKILL.md` vào `.agents/skills/` (hoặc thư mục AgentSkills khác), ép bằng `@skill-id`, hoặc nhờ nghiên cứu web để sinh báo cáo Markdown kèm nguồn.

<p align="center">
  <img src="assets/play-item-warcraft.png" width="420" alt="Ảnh minh họa vật phẩm InkOS Play">
</p>

**Viết tiểu thuyết tiếng Anh bản địa!** — 10 hồ sơ thể loại tiếng Anh tích hợp sẵn với quy tắc nhịp, danh sách từ gây mệt và chiều duyệt riêng. Đặt `--lang en` và bắt đầu.

## Bắt đầu nhanh

### Cài đặt

```bash
npm i -g @actalk/inkos
```

### Dùng qua OpenClaw 🦞

InkOS đã phát hành dưới dạng [OpenClaw](https://clawhub.ai/narcooo/inkos) Skill, có thể được mọi agent tương thích (Claude Code, OpenClaw...) gọi trực tiếp:

```bash
clawhub install inkos          # Cài Skill InkOS từ ClawHub
```

Nếu cài qua npm hoặc clone repo, `skills/SKILL.md` đã nằm sẵn — 🦞 đọc trực tiếp được mà không cần cài thêm từ ClawHub.

Sau khi cài, Claw nên ưu tiên dùng cổng tương tác dùng chung:

```bash
inkos interact --json --message "tiếp tục cuốn sách hiện tại, nhưng thắt nhịp lại"
```

Cổng này đi thẳng vào cùng nhân thực thi hội thoại của TUI, nên OpenClaw, TUI và Studio dùng chung một bộ não điều khiển. Output JSON hiện gồm văn bản trả lời của assistant và thông tin session tương tác; kết quả thật vẫn phải lấy từ kết quả công cụ và file đã ghi, không suy luận từ lời nói của mô hình.

Các lệnh nguyên tử (`plan chapter` / `compose chapter` / `draft` / `audit` / `revise` / `write next`) vẫn còn, nhưng giờ được coi là công cụ cấp thấp thay vì cổng vào ưu tiên cho OpenClaw. Bạn cũng có thể tìm `inkos` trên [ClawHub](https://clawhub.ai) để xem trực tuyến.

### Agent Skills

InkOS dùng trực tiếp chuẩn `SKILL.md` làm phần mở rộng năng lực, không còn duy trì giao thức Skill riêng của InkOS. Skill chỉ cung cấp cho Chat Agent hướng dẫn chuyên môn và tài liệu tham khảo tĩnh — **không** thêm quyền thực thi nào. Tạo, ghi, sửa và sinh ảnh vẫn đi qua công cụ InkOS và cổng xác nhận.

Cách dùng:

- Đặt vào thư mục chuẩn: `skills/` của dự án, `.agents/skills/`, hoặc thư mục người dùng `~/.agents/skills/`, `~/.openclaw/skills/`. Studio có thể nhập cả thư mục chứa `SKILL.md` kèm tài liệu tham khảo tĩnh; nhập từ dự án lưu về `.agents/skills/`.
- Hoặc đặt `INKOS_SKILL_DIRS=/abs/path/to/skills`; đường dẫn có thể trỏ tới một thư mục skill hoặc thư mục chứa nhiều thư mục skill con. Nhiều đường dẫn phân tách bằng ký tự phân tách của hệ điều hành.
- Trong Chat dùng `@skill-id` để ép lượt này, ví dụ: `@detective-play tạo một thế giới mở theo chuỗi chứng cứ`.
- Không viết `@skill-id` thì Chat Agent tự quyết định có gọi `use_skill` theo ý đồ hiện tại hay không; không còn kích hoạt máy móc qua loại session, từ khóa hay khớp chuỗi.
- Skill ngoài chỉ cung cấp chỉ dẫn và tài liệu tham khảo tĩnh; InkOS không tự động chạy script bên trong, và skill không thể né quyền công cụ hay cổng xác nhận hiện có.
- Cấu hình prompt **không phải** skill. Các prompt pack có sẵn được quản lý riêng trong **Project Settings → Prompt packs**, file override cấp dự án nằm dưới `prompt/<pack>/<prompt>.md`.

`SKILL.md` tối thiểu:

```md
---
name: Detective Play
description: Detective evidence and suspect-board play.
---
Use evidence chains; do not turn clues into generic atmosphere.
```

### Cấu hình

InkOS tách hai đường cấu hình: **Studio dùng cấu hình service trực quan**, còn **CLI / daemon / môi trường deploy có thể dùng env override**. Hai bên không ghi đè lẫn nhau.

**Cách 1: Cấu hình service trong Studio (khuyến nghị)**

```bash
inkos init my-novel
cd my-novel
inkos
```

Mở Studio rồi vào **Model Settings**:

1. Chọn service, ví dụ Google Gemini, Moonshot, MiniMax, DeepSeek, kkaiapi, OpenRouter hoặc custom endpoint.
2. Dán API Key và bấm test kết nối.
3. Chọn mô hình khả dụng và lưu.
4. Quay lại Studio Chat hoặc trang sách của bạn.

Studio chỉ dùng cấu hình service của dự án và `.inkos/secrets.json`. Nó có thể hiện gợi ý phát hiện env, nhưng file env **không** override service/model/base URL/API Key mà Studio đã chọn.

MiniMax dùng endpoint OpenAI-compatible `/v1/chat/completions`. InkOS tắt nội dung suy nghĩ trả về theo mặc định cho `MiniMax-M3*`; suy nghĩ M2.x không tắt được do phía upstream giới hạn.

**Cách 2: Cấu hình env cho CLI / daemon / deploy**

```bash
inkos config set-global \
  --lang en \
  --provider <openai|anthropic|custom> \
  --base-url <API endpoint> \
  --api-key <API key của bạn> \
  --model <tên model>

# provider: openai / anthropic / custom (custom cho proxy OpenAI-compatible)
# base-url: URL nhà cung cấp API của bạn
# api-key: API key của bạn
# model: tên mô hình của bạn
```

`--lang en` đặt tiếng Anh làm ngôn ngữ sáng tác mặc định cho CLI / daemon. Lưu vào `~/.inkos/.env`.

Bạn cũng có thể tự sửa global `~/.inkos/.env` hoặc `.env` của dự án:

```bash
# Bắt buộc
INKOS_LLM_PROVIDER=          # openai / anthropic / custom (custom cho mọi API OpenAI-compatible)
INKOS_LLM_BASE_URL=          # API endpoint
INKOS_LLM_API_KEY=           # API Key
INKOS_LLM_MODEL=             # Tên model

# Ngôn ngữ (mặc định theo global hoặc thể loại)
INKOS_DEFAULT_LANGUAGE=en

# Tuỳ chọn
INKOS_LLM_SERVICE=moonshot   # nên ghi; nếu bỏ trống InkOS tự nhận diện từ baseUrl
INKOS_LLM_TEMPERATURE=0.7
INKOS_LLM_THINKING_BUDGET=0
INKOS_LLM_EXTRA_top_p=0.9
```

Thứ tự hợp thành của CLI:

```text
cấu hình service của Studio/dự án
→ key service trong .inkos/secrets.json
→ global ~/.inkos/.env
→ .env của dự án
→ biến môi trường tiến trình hiện tại
→ tham số CLI
```

Tức là CLI mặc định tái dùng service và key đã cấu hình trong Studio; nếu env khai báo `INKOS_LLM_SERVICE` / `INKOS_LLM_MODEL` / `INKOS_LLM_BASE_URL` / `INKOS_LLM_API_KEY` thì làm lớp override. Cấu hình env cũ chỉ có `baseUrl + model + apiKey` vẫn dùng được, InkOS cố suy ngược service từ baseUrl.

Chỉ định service/model một lần:

```bash
inkos write next --service google --model gemini-2.5-flash
inkos write next --service moonshot --model kimi-k2.5 --no-stream
inkos agent "viết tiếp chương kế" --api-key-env MOONSHOT_API_KEY
inkos doctor --service minimaxCodingPlan --model MiniMax-M2.7
```

`--service` tự suy ra baseUrl, giao thức và chiến lược tương thích từ provider bank; `--model` phải thuộc service cuối cùng, nếu không sẽ báo lỗi ngay — tránh gửi nhầm model Kimi sang Gemini.

**Cách 3: Định tuyến đa model (tuỳ chọn)**

```bash
# Gán model khác nhau cho từng agent, cân bằng chất lượng & chi phí
inkos config set-model writer <model> --provider <provider> --base-url <url> --api-key-env <ENV_VAR>
inkos config set-model auditor <model> --provider <provider>
inkos config show-models        # xem routing hiện tại
```

Agent chưa cấu hình riêng tự động dùng model toàn cục.

#### Chẩn đoán cấu hình

```bash
inkos doctor
```

`doctor` hiện chế độ effective config hiện tại, nguồn service/model/API Key, và thử kết nối API. Các chế độ thường gặp:

| Chế độ | Ý nghĩa |
| ------ | ------- |
| `studio-project` | Lúc Studio chạy: chỉ dùng cấu hình Studio/project và secrets |
| `cli-project` | Lúc CLI chạy: lấy cấu hình Studio làm gốc rồi chồng env và tham số CLI |
| `legacy-env` | Chế độ env cũ: tương thích dự án cũ chỉ dùng `.env` |

## Viết cuốn sách đầu tiên

```bash
inkos book create --title "Kiếm Đạo Độc Tôn" --genre xuanhuan  # tạo sách mới
inkos write next Kiếm Đạo Độc Tôn      # viết chương kế (draft → audit → sửa theo cấu hình)
inkos status                   # xem trạng thái
inkos review list Kiếm Đạo Độc Tôn     # duyệt bản nháp
inkos review approve-all Kiếm Đạo Độc Tôn  # duyệt hàng loạt
inkos export Kiếm Đạo Độc Tôn          # xuất toàn sách
inkos export Kiếm Đạo Độc Tôn --format epub  # xuất EPUB (đọc trên điện thoại/Kindle)
```

### Viết trọn một truyện ngắn

Muốn sinh ngay một truyện ngắn hoàn chỉnh, nói trong Studio Chat:

```text
Viết một truyện ngắn 12 chương, hướng: đô thị, hôn nhân đảo chiều, nữ chính cầm sổ sách làm bằng chứng phản công.
```

Hoặc qua CLI:

```bash
inkos short run \
  --direction "đô thị ngắn hôn nhân đảo chiều nữ chính dùng chứng cứ phản công" \
  --chapters 12 \
  --chars 1000
```

Sản phẩm nằm ở `shorts/<tên truyện>/final/`, gồm `full.md`, `sales-package.md`, `cover-prompt.md`; nếu đã cấu hình dịch vụ bìa sẽ thêm `cover.png`.

### Làm bìa riêng

Chỉ muốn làm bìa cho tiêu đề/giới thiệu có sẵn, không cần chạy lại nội dung truyện ngắn — nói trong Studio Chat:

```text
Tạo bìa truyện ngắn cho "Ngày cô ấy ký đơn ly hôn, anh hối hận phát điên", thiên về đô thị hiện đại, đảo chiều mạnh.
```

Công cụ bìa sinh độc lập `covers/<tiêu đề>/cover-prompt.md` và `covers/<tiêu đề>/cover.png`. Nếu chưa cấu hình dịch vụ bìa, hãy đặt trước trong Model Settings của Studio.

Sau khi sinh vẫn có thể tiếp tục yêu cầu sửa prompt bìa qua chat, ví dụ “kéo nhân vật lại gần, chữ tiêu đề to hơn, biểu cảm lạnh hơn”. Hệ thống sẽ dùng `coverPrompt` mới ghi đè `cover-prompt.md` và sinh lại bìa, không cần viết lại truyện ngắn.

### Khởi động thế giới mở / tương tác phân nhánh

Trong Studio Chat chọn “Open World” hoặc “Interactive Branch”, rồi mô tả bằng ngôn ngữ tự nhiên:

```text
Tạo một thế giới mở tháp canh biên ải phong cách ma huyễn. Thời gian không theo lượt cố định, tuần tra tính theo giờ, luyện công có thể kéo dài nhiều ngày. Trang bị có độ hiếm, nhưng đừng dùng bảng số, hãy thể hiện qua chất liệu và độ bóng.
```

Hệ thống sẽ sinh thế giới, nhân vật, vật phẩm, chứng cứ, quan hệ, cảnh hiện tại và hành động khả dụng. Thế giới mở hỗ trợ nhập hành động tự do; tương tác phân nhánh đưa ra lựa chọn có thể bấm. Nếu cấu hình dịch vụ bìa/ảnh, nhân vật, vật phẩm, chứng cứ và cảnh đều có thể sinh ảnh và cuộn hiển thị trong luồng hội thoại.

## Tính năng chính

### Studio Chat + Action Surface

Studio Chat không chỉ là ô trò chuyện. Nó tạo được truyện dài, chạy truyện ngắn, sinh bìa, khởi chạy Play, biên tập file văn bản bền vững, và đưa ra xác nhận trước khi thực hiện hành động nặng. Trò chuyện thường trả lời trực tiếp; hành động sáng tác rõ ràng mới vào tool execution.

### InkOS Play: thế giới mở và tương tác phân nhánh

Play duy trì trạng thái thế giới tiếp diễn: nhân vật, địa điểm, vật phẩm, chứng cứ, quan hệ, thời gian, cảnh và HUD. Không phải template RPG cố định — bạn dùng ngôn ngữ tự nhiên định nghĩa hợp đồng thế giới: trang bị tu tiên có thể có độ hiếm, truyện tình cảm có thể có tầng rung động, truyện trinh thám có thể có vòng đời chứng cứ. Hệ thống ghi các quy tắc này vào trạng thái thế giới rồi dùng cho kể chuyện và minh họa sau đó.

### Đa chiều audit + khử “vị AI”

Kiểm định viên liên tục (continuity auditor) kiểm tra bản nháp từng chương theo **37 chiều**: trí nhớ nhân vật, liên tục vật chất, thu hồi phục bút, lệch outline, nhịp kể, cung cảm xúc... Kèm chiều phát hiện vệt AI — tự nhận diện biểu cảm “mùi LLM” (từ tần suất cao, câu đơn điệu, tổng kết thừa). Chuỗi viết truyện dài mặc định tự sửa tối đa một lần; muốn tự khép vòng nhiều hơn có thể chỉnh `writing.reviewRetries`.

Quy tắc khử AI nằm sẵn trong tầng prompt của writer agent — danh sách từ mệt, cấu trúc câu cấm, vân tay văn phong — giảm dấu vết AI từ gốc. `revise --mode anti-detect` dành riêng cho việc tẩy dấu AI trên chương có sẵn.

### Phỏng văn phong

`inkos style analyze` phân tích văn bản tham khảo, trích dấu vân tay thống kê (phân bố độ dài câu, đặc trưng tần từ, mô hình nhịp) và hướng dẫn phong cách LLM. `inkos style import` nạp dấu vân tay vào sách chỉ định; mọi chương sau tự áp dụng phong cách đó, và reviser cũng dùng chuẩn phong cách để audit.

### Bản brief sáng tác

`inkos book create --brief my-ideas.md` truyền vào ý tưởng, bối cảnh thế giới quan, tài liệu nhân vật. Architect sinh thiết lập truyện (`story_bible.md`) và quy tắc sáng tác (`book_rules.md`) dựa trên brief — thay vì sáng tác chay; đồng thời lưu brief vào `story/author_intent.md` để ý đồ dài hạn không chỉ có hiệu lực một lần lúc tạo sách.

### Mặt điều khiển đầu vào

Mỗi cuốn sách có hai tài liệu Markdown điều khiển có thể sửa lâu dài:

- `story/author_intent.md`: cuốn này lâu dài muốn trở thành gì
- `story/current_focus.md`: 1–3 chương gần đây cần kéo sự chú ý về đâu

Trước khi viết có thể chạy:

```bash
inkos plan chapter Kiếm Đạo Độc Tôn --context "chương này kéo sự chú ý về mâu thuẫn sư đồ"
inkos compose chapter Kiếm Đạo Độc Tôn
```

Lệnh trên sinh `story/runtime/chapter-XXXX.intent.md`, `context.json`, `rule-stack.yaml`, `trace.json`. `intent.md` cho người đọc; các file khác cho hệ thống thực thi và gỡ lỗi. `plan` gọi LLM sinh ý đồ chương; `compose` chỉ biên dịch tài liệu/trạng thái cục bộ, có thể chạy trước khi cấu hình API Key để kiểm tra mặt điều khiển.

### Quản lý số từ

`draft` / `write next` / `revise` dùng chung quản lý số từ kiểu bảo thủ:

- `--words` là số từ mục tiêu; hệ thống tự suy khoảng cho phép, không hứa trúng từng chữ
- Tiếng Trung mặc định đếm `zh_chars`, tiếng Anh mặc định đếm `en_words`
- Nếu chính văn vượt khoảng cho phép, InkOS chỉ thêm tối đa 1 lần hiệu chỉnh chuẩn hóa (nén hoặc bù), không cắt cứng
- Nếu sau 1 lần hiệu chỉnh vẫn vượt hard range, chương vẫn lưu nhưng để lại warning/telemetry độ dài trong kết quả và index chương

### Viết tiếp tác phẩm có sẵn

`inkos import chapters` nhập chương từ văn bản tiểu thuyết có sẵn, tự dựng lại trạng thái cấu trúc, tóm tắt chương, phục bút, quan hệ nhân vật và bản chiếu Markdown đọc được; hỗ trợ `第X章` và phân tách tùy chỉnh, nhập tiếp từ điểm dừng. Sau khi nhập, `inkos write next` viết tiếp bình thường.

### Fanfic

`inkos fanfic init --from source.txt --mode canon` tạo sách fanfic từ tài liệu gốc. Bốn chế độ: canon (nối chính truyện), au (thế giới song song), ooc (tái tạo tính cách), cp (hướng CP). Có sẵn bộ nhập chính truyện, chiều audit riêng cho fanfic và kiểm soát ranh giới thông tin — đảm bảo thiết lập không mâu thuẫn.

### Định tuyến đa model

Từng agent có thể đi model/provider khác nhau. Writer dùng Claude (sáng tạo mạnh), Auditor dùng GPT-4o (nhanh rẻ), Radar dùng model local (zero chi phí). `inkos config set-model` cấu hình theo từng agent; agent chưa cấu hình tự fallback model toàn cục.

### Daemon + thông báo

`inkos up` khởi động vòng lặp nền tự viết chương. Pipeline tự đẩy các vấn đề không nghiêm trọng xử lý được; vấn đề cần người quyết thì tạm dừng và để lại kết quả để duyệt. Thông báo hỗ trợ Telegram, Feishu, WeCom, Webhook (HMAC-SHA256 + lọc sự kiện). Log ghi vào `inkos.log` (JSON Lines), `-q` chế độ im lặng.

### Tương thích model local

Hỗ trợ mọi giao diện OpenAI-compatible (Studio thêm custom service, hoặc CLI `--provider custom` / `INKOS_LLM_PROVIDER=custom`). Test service sẽ thử nhiều tổ hợp giao thức và stream, lưu/đề xuất transport khả dụng. Bộ phân giải fallback xử lý output thiếu chuẩn của model nhỏ, stream đứt thì tự khôi phục phần nội dung.

### Đảm bảo độ tin cậy

Mỗi chương tự tạo snapshot trạng thái; `inkos write rewrite` rollback mọi chương. Writer xuất bảng tự kiểm (ngữ cảnh, tài nguyên, phục bút, rủi ro) trước khi viết và bảng kết toán sau khi viết; auditor đối chứng chéo. Khóa file chặn ghi đồng thời. Validator sau viết gồm phát hiện lặp xuyên chương và hơn 10 quy tắc cứng tự spot-fix.

Hệ phục bút dùng Zod schema kiểm tra — `lastAdvancedChapter` phải là số nguyên, `status` chỉ được là open/progressing/deferred/resolved. JSON delta do LLM xuất trước khi ghi đi qua `applyRuntimeStateDelta` (cập nhật immutable) + `validateRuntimeState` (kiểm cấu trúc). Dữ liệu xấu bị từ chối, không lăn theo.

Giới hạn output model do model card của provider bank quản lý; các key dành riêng trong `llm.extra` / `INKOS_LLM_EXTRA_*` (max_tokens, temperature, model, messages, stream...) bị lọc tự động, tránh ghi đè tham số lõi.

## Cách hoạt động

InkOS hiện có hai tuyến chính: **tuyến sản xuất truyện dài/ngắn** sinh văn bản giao được; **tuyến Play** duy trì thế giới tương tác. Chúng chia sẻ cấu hình model, Studio Chat, hành động có xác nhận và preview sản phẩm, nhưng cấu trúc trạng thái khác nhau.

<p align="center">
  <img src="assets/arch-system.svg" width="900" alt="Kiến trúc tổng thể InkOS">
</p>

Mỗi chương truyện dài mặc định chạy “lên kế hoạch → biên soạn → viết → audit → sửa cần thiết → đồng bộ trạng thái”:

<p align="center">
  <img src="assets/arch-pipeline.svg" width="900" alt="Pipeline sản xuất chương InkOS">
</p>

| Agent | Trách nhiệm |
| ----- | ----------- |
| **Radar** | Quét xu hướng nền tảng và sở thích độc giả, định hướng câu chuyện (cắm được, có thể bỏ) |
| **Planner** | Đọc ý đồ tác giả + focus hiện tại + kết quả tra trí nhớ, sinh ý đồ chương (must-keep / must-avoid) |
| **Composer** | Chọn ngữ cảnh theo nhiệm vụ từ trạng thái cấu trúc, tài liệu điều khiển và Markdown projection; biên dịch rule stack và artifact runtime |
| **Architect** | Khi tạo sách / nhập / khởi tạo fanfic: sinh thiết lập nền — khung truyện, quy tắc, nhân vật và file điều khiển dài hạn |
| **Writer** | Dựa trên ngữ cảnh tinh gọn đã biên soạn sinh chính văn (quản số từ + dẫn dắt hội thoại) |
| **Observer** | Trích quá mức 9 loại sự kiện từ chính văn (nhân vật, địa điểm, tài nguyên, quan hệ, cảm xúc, thông tin, phục bút, thời gian, trạng thái vật lý) |
| **Reflector** | Xuất JSON delta (thay vì markdown đầy đủ), code tầng kiểm Zod rồi ghi immutable |
| **Normalizer** | Chỉ khi chính văn lệch hard range rõ rệt: nén/mở rộng một pass |
| **Continuity Auditor** | Đối chứng bản nháp với trạng thái cấu trúc, tài liệu điều khiển và ngữ cảnh chương; kiểm liên tục và chất lượng |
| **Reviser** | Sửa vấn đề then chốt do audit tìm ra; mặc định tự sửa tối đa một lần, có thể chỉnh `writing.reviewRetries`; vấn đề khác đánh dấu cho người duyệt |

Nếu audit không qua, pipeline mặc định chỉ làm một vòng “sửa → audit lại”; vấn đề chưa giải quyết được giữ trong kết quả/trạng thái để người hoặc lệnh sau xử lý. Muốn tự khép vòng mạnh hơn: `inkos config set writing.reviewRetries 3`.

### Trí nhớ dài hạn

Trí nhớ có thẩm quyền của mỗi cuốn gồm ba lớp:

| Lớp | Mục đích |
| --- | -------- |
| `story/state/*.json` | Trạng thái cấu trúc có thẩm quyền: trạng thái hiện tại, phục bút, tóm tắt chương... kiểm qua Zod schema |
| `story/*.md` | Bản chiếu đọc được: `current_state.md`, `pending_hooks.md`, `chapter_summaries.md`, `character_matrix.md`... |
| `story/memory.db` | Cơ sở dữ liệu trí nhớ theo chuỗi thời gian SQLite (tự bật trên Node 22+) dùng để truy vấn sự kiện, phục bút và tóm tắt liên quan |

Auditor đối chiếu từng bản nháp với các trạng thái này. Nếu nhân vật “nhớ” chuyện chưa từng thấy, hoặc lôi ra vũ khí đã mất từ hai chương trước, auditor sẽ bắt được.

Settler không bắt model xuất file markdown đầy đủ nữa, mà xuất JSON delta; code tầng apply immutable + kiểm cấu trúc trước khi ghi. File Markdown giữ làm bản chiếu đọc được. Sách cũ lần chạy đầu tự động di trú từ legacy Markdown sang JSON có cấu trúc.

Trên Node 22+ tự bật SQLite memory (`story/memory.db`), truy vấn sự kiện, phục bút và tóm tắt theo mức liên quan — tránh nhét toàn bộ lịch sử gây phình ngữ cảnh.

<p align="center">
  <img src="assets/arch-memory.svg" width="900" alt="Trí nhớ dài hạn và trạng thái InkOS">
</p>

### Mặt điều khiển và artifact runtime

Ngoài trạng thái runtime, InkOS tách “rào chắn” và “tùy biến” thành tầng điều khiển có thể rà soát:

- `story/author_intent.md`: ý đồ dài hạn của tác giả
- `story/current_focus.md`: điểm tập trung giai đoạn hiện tại
- `story/runtime/chapter-XXXX.intent.md`: mục tiêu, giữ lại, tránh, cách xử lý xung đột của chương này
- `story/runtime/chapter-XXXX.context.json`: ngữ cảnh thực sự được chọn vào chương này
- `story/runtime/chapter-XXXX.rule-stack.yaml`: tầng ưu tiên và quan hệ override của chương này
- `story/runtime/chapter-XXXX.trace.json`: dấu vết biên dịch đầu vào của chương này

Nhờ vậy brief, outline quyển, quy tắc cấp sách và nhiệm vụ hiện tại không trộn thành một cục prompt, mà được biên dịch trước rồi mới viết.

### Hệ quy tắc sáng tác

Writer agent tích hợp sẵn ~25 quy tắc sáng tác chung (xây dựng nhân vật, kỹ thuật kể, logic tự nhất quán, ràng buộc ngôn ngữ, khử AI) áp dụng mọi thể loại.

Trên nền đó, mỗi thể loại có quy tắc riêng (cấm kỵ, ràng buộc ngôn ngữ, nhịp, chiều audit); mỗi cuốn có `book_rules.md` độc lập (nhân vật chính, trần số, cấm tùy biến), `story_bible.md` (thế giới quan), `author_intent.md` (hướng dài hạn) và `current_focus.md` (điểm tập trung gần). `volume_outline.md` vẫn là plan mặc định, nhưng trong chế độ v2 input governance không còn tự nhiên đè lên ý đồ nhiệm vụ hiện tại.

## Các chế độ dùng

InkOS cung cấp bốn cách tương tác, cùng chia sẻ một tập thao tác nguyên tử:

### 1. Pipeline hoàn chỉnh (một lệnh)

```bash
inkos write next Kiếm Đạo Độc Tôn          # viết draft → audit → tự sửa theo cấu hình
inkos write next Kiếm Đạo Độc Tôn --count 5 # viết liên tục 5 chương
```

`write next` mặc định đi theo chuỗi điều hành đầu vào `plan → compose → write`, số vòng tự sửa sau audit mặc định là 1. Nếu muốn lùi về đường prompt cũ, đặt rõ trong `inkos.json`:

```json
{
  "inputGovernanceMode": "legacy"
}
```

Giá trị mặc định là `v2`. `legacy` chỉ giữ làm fallback tường minh.

### 2. Lệnh nguyên tử (tổ hợp được, phù hợp agent ngoài gọi)

```bash
inkos plan chapter Kiếm Đạo Độc Tôn --context "chương này trọng tâm viết mâu thuẫn sư đồ" --json
inkos compose chapter Kiếm Đạo Độc Tôn --json
inkos draft Kiếm Đạo Độc Tôn --context "chương này trọng tâm viết mâu thuẫn sư đồ" --json
inkos audit Kiếm Đạo Độc Tôn 31 --json
inkos revise Kiếm Đạo Độc Tôn 31 --json
```

Mỗi lệnh thực thi một thao tác độc lập, `--json` xuất dữ liệu có cấu trúc. `plan` / `compose` lo phần đầu vào điều khiển, `draft` / `audit` / `revise` lo chính văn và chuỗi chất lượng. Có thể bị agent AI ngoài gọi qua `exec`, hoặc dùng trong script.

### 3. Chế độ Agent ngôn ngữ tự nhiên

```bash
inkos agent "giúp tôi viết một cuốn đô thị tu tiên, nhân vật chính là lập trình viên"
inkos agent "viết chương kế, trọng tâm mâu thuẫn sư đồ"
inkos agent "quét xu hướng thị trường trước, rồi theo kết quả tạo một cuốn sách mới"
```

Chế độ Agent phơi ra bộ công cụ thu hẹp theo bối cảnh: tạo sách, đọc/ghi mặt điều khiển, plan, compose, viết, audit, revise, truyện ngắn, bìa, Play... mở theo loại session hiện tại. Workflow Agent khuyến nghị: chỉnh mặt điều khiển trước, rồi `plan` / `compose`, cuối cùng quyết định viết draft hay chạy pipeline đầy đủ.

### 4. Chế độ Studio Play

“Open World” và “Interactive Branch” trong Studio là cổng sáng tác tương tác. Không bắt bạn tạo sách trước, cũng không ép số liệu RPG. Bạn mô tả “thế giới vận hành thế nào, thời gian trôi ra sao, nhân vật có tự hành động không, vật phẩm và chứng cứ tác động lên câu chuyện thế nào”, hệ thống sinh thế giới có thể chơi tiếp và ghi trạng thái từng lượt về local.

## Ảnh thực tế Studio và sản phẩm

<p align="center">
  <img src="assets/studio-dashboard.png" width="760" alt="Cổng vào bắt đầu sáng tác InkOS Studio">
</p>

<p align="center">
  <strong>Bìa điện thoại InkOS Short</strong><br>
  <img src="assets/inkos-short-demo-cover.png" width="260" alt="Bìa truyện ngắn">
</p>

<p align="center">
  <strong>Tương tác tình cảm InkOS Play</strong><br>
  <img src="assets/play-openworld-romance.png" width="560" alt="Tương tác tình cảm">
</p>

<p align="center">
  <strong>Tương tác trinh thám InkOS Play</strong><br>
  <img src="assets/play-openworld-detective.png" width="560" alt="Tương tác trinh thám">
</p>

<p align="center">
  <strong>Minh họa vật phẩm InkOS Play</strong><br>
  <img src="assets/play-item-warcraft.png" width="560" alt="Minh họa vật phẩm">
</p>

Ảnh đầu là ảnh thực tế Studio hiện tại. Bốn ảnh sau là kết quả sinh thật từ InkOS Short và InkOS Play: bìa truyện ngắn dùng cho thumbnail bấm vào trên điện thoại; ảnh Play thể hiện thế giới mở, chứng cứ trinh thám, cảnh tương tác và khả năng hình ảnh vật phẩm.

## Tham chiếu lệnh

| Lệnh | Mô tả |
| ---- | ----- |
| `inkos init [name]` | Khởi tạo dự án (bỏ `name` sẽ khởi tạo trong thư mục hiện tại) |
| `inkos book create` | Tạo sách mới (`--genre`, `--platform`, `--chapter-words`, `--target-chapters`, `--brief <file>` truyền bản brief) |
| `inkos book update [id]` | Sửa cấu hình sách (`--chapter-words`, `--target-chapters`, `--status`) |
| `inkos book list` | Liệt kê mọi sách |
| `inkos book delete <id>` | Xóa sách và toàn bộ dữ liệu (`--force` bỏ qua xác nhận) |
| `inkos genre list/show/copy/create` | Xem, sao chép, tạo thể loại |
| `inkos plan chapter [id]` | Sinh `intent.md` chương kế (`--context` / `--context-file` truyền chỉ dẫn hiện tại) |
| `inkos compose chapter [id]` | Sinh `context.json`, `rule-stack.yaml`, `trace.json` chương kế |
| `inkos write next [id]` | Pipeline đầy đủ viết chương kế (`--words` đè số từ, `--count` viết liên tiếp, `-q` im lặng) |
| `inkos write rewrite [id] <n>` | Viết lại chương N (khôi phục snapshot trạng thái; `--force` bỏ xác nhận, `--words` đè số từ) |
| `inkos draft [id]` | Chỉ viết bản nháp (`--words` đè số từ, `-q` im lặng) |
| `inkos audit [id] [n]` | Audit chương chỉ định |
| `inkos revise [id] [n]` | Sửa chương chỉ định |
| `inkos agent <instruction>` | Chế độ Agent ngôn ngữ tự nhiên |
| `inkos review list [id]` | Duyệt bản nháp |
| `inkos review approve-all [id]` | Duyệt hàng loạt |
| `inkos status [id]` | Trạng thái dự án |
| `inkos export [id]` | Xuất sách (`--format txt/md/epub`, `--output <path>`, `--approved-only`) |
| `inkos radar scan` | Quét xu hướng nền tảng |
| `inkos fanfic init` | Tạo sách fanfic từ tài liệu gốc (`--from`, `--mode canon/au/ooc/cp`) |
| `inkos short run` | Sinh gói truyện ngắn độc lập (chính văn, giới thiệu điểm bán, cover prompt, bìa tùy chọn) |
| `inkos eval [id]` | Sinh báo cáo đánh giá chất lượng (hỗ trợ `--json`, khoảng chương) |
| `inkos consolidate [id]` | Gộp tóm tắt chương truyện dài, giảm áp lực ngữ cảnh |
| `inkos forecast create/show/select` | Sinh, kiểm tra và chọn nhánh phi-chính-sử truyện dài; chọn chỉ lưu kế hoạch, không sửa chính sử |
| `inkos interact` | Cổng ngôn ngữ tự nhiên cho agent ngoài / CLI (`--json`, `--message`, `--book`) |
| `inkos config set-global` | Đặt env LLM toàn cục cho CLI / daemon / deploy (`~/.inkos/.env`) |
| `inkos config show-global` | Xem cấu hình toàn cục |
| `inkos config set/show` | Xem/cập nhật cấu hình dự án |
| `inkos config set-model <agent> <model>` | Đặt model override cho agent (`--base-url`, `--provider`, `--api-key-env` hỗ trợ định tuyến đa Provider) |
| `inkos config remove-model <agent>` | Gỡ model override của agent (fallback về mặc định) |
| `inkos config show-models` | Xem routing model hiện tại |
| `inkos doctor` | Chẩn đoán cấu hình (chế độ effective config, nguồn, kết nối API, gợi ý tương thích) |
| `inkos detect [id] [n]` | Phát hiện AIGC (`--all` mọi chương, `--stats` thống kê) |
| `inkos style analyze <file>` | Phân tích văn bản tham khảo trích dấu vân tay phong cách |
| `inkos style import <file> [id]` | Nạp dấu vân tay phong cách vào sách chỉ định |
| `inkos import canon [id] --from <parent>` | Nhập chính truyện vào sách ngoại truyện |
| `inkos import chapters [id] --from <path>` | Nhập chương có sẵn để viết tiếp (`--split`, `--resume-from`) |
| `inkos analytics [id]` / `inkos stats [id]` | Phân tích dữ liệu sách (tỷ lệ audit đạt, vấn đề tần suất cao, xếp hạng chương, dùng token) |
| `inkos update` | Cập nhật lên phiên bản mới nhất |
| `inkos studio` / `inkos` | Khởi động Web workbench (`-p` chỉ định port, mặc định 4567; Studio dùng cấu hình service, không dùng env override) |
| `inkos tui` | Khởi động TUI toàn màn hình |
| `inkos up / down` | Khởi động/dừng daemon (`-q` im lặng, tự ghi `inkos.log`) |

`[id]` có thể bỏ khi dự án chỉ có một cuốn — tự phát hiện. Mọi lệnh hỗ trợ `--json` xuất dữ liệu có cấu trúc. `draft` / `write next` / `plan chapter` / `compose chapter` hỗ trợ `--context` truyền chỉ dẫn sáng tác, `--words` đè số từ mục tiêu mỗi chương. `book create` hỗ trợ `--brief <file>` truyền bản brief (ý tưởng/tài liệu thiết lập); Architect dựa trên đó sinh thiết lập thay vì sáng tác chay. `plan chapter` gọi LLM sinh ý đồ chương; `compose chapter` không bắt buộc LLM trực tuyến — có thể kiểm tra đầu vào điều hành trước khi cấu hình API Key.

CLI còn hỗ trợ tham số override LLM một lần: `--service`, `--model`, `--api-key-env`, `--base-url`, `--api-format <chat|responses>`, `--stream`, `--no-stream`. Ví dụ:

```bash
inkos write next --service google --model gemini-2.5-flash
inkos up --service moonshot --model kimi-k2.5 --api-key-env MOONSHOT_API_KEY
```

## Lộ trình

- ~~Web workbench `packages/studio` (Vite + React + Hono)~~ — đã phát hành, chạy bằng `inkos` hoặc `inkos studio`
- ~~Tiểu thuyết tương tác / thế giới mở (kể chuyện phân nhánh + hành động tự do + tự minh họa)~~ — Studio Play đã triển khai
- Can thiệp cục bộ (viết lại nửa chương + cập nhật tầng file truth sau đó)
- Hệ thống plugin agent tùy biến
- Xuất định dạng nền tảng (Qidian, Fanqie...)

## Đóng góp

Hoan nghênh đóng góp code. Mở issue hoặc PR.

```bash
pnpm install
pnpm dev          # chế độ watch
pnpm test         # chạy test
pnpm typecheck    # kiểm tra kiểu
```

## Star History

<a href="https://www.star-history.com/#Narcooo/inkos&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Narcooo/inkos&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Narcooo/inkos&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Narcooo/inkos&type=date&legend=top-left" />
 </picture>
</a>

## Skills Download History

<div align="center">

<a href="https://skill-history.com/narcooo/inkos">
  <img alt="Skills Download History" src="https://skill-history.com/chart/narcooo/inkos.svg" />
</a>

</div>

## Repobeats

![Repobeats analytics image](https://repobeats.axiom.co/api/embed/024114415c1505a8c27fb121e3b392524e48f583.svg)

## Contributors

<a href="https://github.com/Narcooo/inkos/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Narcooo/inkos" alt="Contributors" />
</a>

## Lời cảm ơn

Runtime agent của InkOS được xây trên [pi](https://github.com/badlogic/pi-mono) (`@mariozechner/pi-ai` và `@mariozechner/pi-agent-core`, tác giả Mario Zechner). Cảm ơn pi vì một nền tảng vững chắc.

Dự án mã nguồn mở này đã liên kết và ghi nhận cộng đồng [LINUX DO](https://linux.do/), cảm ơn các thành viên cộng đồng vì phản hồi, kiểm thử và thảo luận.

## Giấy phép

[AGPL-3.0](LICENSE)
