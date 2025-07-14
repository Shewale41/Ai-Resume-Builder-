import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { AIChatSession } from './../../../../../service/AIModal'

const prompt = "Job Title: {jobTitle}, Depends on job title give me list of summary for 3 experience levels, Mid Level and Fresher level in 3-4 lines in array format, With summary and experience_level field in JSON format"

function Summery({ enabledNext = () => {} }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [summary, setSummary] = useState()
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([])
  useEffect(() => {
    if (summary) {
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      })
    }
  }, [summary])

  const GenerateSummeryFromAI = async () => {
    setLoading(true)
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle)
    try {
      const result = await AIChatSession.sendMessage(PROMPT)
      const responseText = await result.response.text()
      const json = JSON.parse(responseText)
      setAiGenerateSummeryList(json)
    } catch (error) {
      toast.error("Failed to generate summary from AI")
    }
    setLoading(false)
  }

  const onSave = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      data: {
        summary: summary,
      },
    }

    GlobalApi.UpdateResumeDetail(params?.resumeId, data)
      .then((resp) => {
        enabledNext(true) // ✅ FIXED HERE
        setLoading(false)
        toast("Details updated")
      })
      .catch((error) => {
        setLoading(false)
        toast.error("Failed to update details")
      })
  }

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={GenerateSummeryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summary || resumeInfo?.summary || ''}
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummary(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Summery
