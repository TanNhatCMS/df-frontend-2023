import React, { useContext } from 'react'
import { ContextModalDelete } from '../../../utils/context/ContextModalDelete'
import { ContextViewBooks } from '../../../utils/context/ContextViewBooks'
import { ContextTheme } from '../../../utils/context/ContextTheme'

function Table() {
  const modalDeleteContext = React.useContext(ContextModalDelete)
  const { setItemDelete } = modalDeleteContext
  const bookViewContext = React.useContext(ContextViewBooks)
  const { currentView } = bookViewContext
  const propsDataList = Object.keys(currentView[0] || {})
  const { theme } = useContext(ContextTheme)

  const handleDelete = (item) => {
    setItemDelete(item)
  }
  const dataValue = currentView.map((item) => {
    const render = propsDataList.map((value, index) => {
      if (value === 'id')
        return (
          <td
            key={`${item} ${index}`}
            className={`${theme === 'dark' ? 'dark' : undefined}`}
          >
            {item[value]}
          </td>
        )
      if (value === 'name')
        return (
          <td
            colSpan={2}
            key={`${item} ${index}`}
            className={`${theme === 'dark' ? 'dark' : undefined}`}
          >
            {item[value]}
          </td>
        )
      if (value === 'topic')
        return (
          <td
            key={`${item} ${index}`}
            className={`${theme === 'dark' ? 'dark' : undefined}`}
          >
            {item[value]}
          </td>
        )

      if (value === 'tag')
        return (
          <td
            key={`${item} ${index}`}
            className={`${theme === 'dark' ? 'dark' : undefined}`}
          >
            <button
              className="delete-button"
              onClick={() => handleDelete(item)}
            >
              Delete
            </button>
          </td>
        )
      return (
        <td
          key={`${item} ${index}`}
          className={`${theme === 'dark' ? 'dark' : undefined}`}
        >
          {item[value]}
        </td>
      )
    })
    return render
  })

  return (
    <div id="wrapper-table">
      <table id="book-table">
        <colgroup>
          {propsDataList.map((prop, index) => {
            if (prop === 'tag') return null
            if (prop === 'name') return <col key={index} span={2} />
            return <col key={index} />
          })}
        </colgroup>
        <thead>
          <tr>
            <th className={`${theme === 'dark' ? 'dark' : undefined}`}>#</th>
            <th
              colSpan={2}
              className={`${theme === 'dark' ? 'dark' : undefined}`}
            >
              Name
            </th>
            <th className={`${theme === 'dark' ? 'dark' : undefined}`}>
              Author
            </th>
            <th className={`${theme === 'dark' ? 'dark' : undefined}`}>
              Topic
            </th>
            <th className={`${theme === 'dark' ? 'dark' : undefined}`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {dataValue.map((item, index) => (
            <tr key={index}>{item}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
