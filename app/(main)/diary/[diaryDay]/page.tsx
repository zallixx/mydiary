export default function DiaryPage({ params }: { params: { diaryDay: string } }) {
    return <h1>{params.diaryDay.split('.')}</h1>;
}

