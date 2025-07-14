import React, { useEffect, useContext } from 'react'
import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import { useState } from 'react'
import { toast } from 'sonner';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import {
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    HtmlButton,
    Separator,
    Toolbar,
    EditorProvider,
    Editor,
} from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModal';
const PROMPT = 'position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'



function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setValue(defaultValue || '');
    }, [defaultValue]);


    const GenerateSummeryFromAI = async () => {
        setLoading(true);
        if (!resumeInfo?.experience?.[index]?.title) {
            toast('Please Add Position Title');
            setLoading(false);
            return;
        }
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
        const result = await AIChatSession.sendMessage(prompt);
        const resp = await result.response.text();
        setValue(resp.replace('[','').replace(']', ''));
        setLoading(false);


    }


    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-sm'>Summery</label>
                <Button variant="outline" size="sm"
                    onClick={GenerateSummeryFromAI} className="flex gap-2 border-primary text-primary" >
                    {loading ?
                        <LoaderCircle className='animate-spin' /> :
                        <>
                            <Brain className='h-2 w-4' />Generate from AI
                        </>
                    }</Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e)
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />

                        <Separator />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />


                        <Separator />

                    </Toolbar>

                </Editor>
            </EditorProvider>
        </div>

    )
}

export default RichTextEditor